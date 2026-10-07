import tkinter as tk
from tkinter import ttk, messagebox
import sqlite3


class PS5GameApp:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("PS5 Game Library")
        self.window.geometry("750x500")

        self.create_db()
        self.create_ui()

        self.window.mainloop()

    # ---------------- DATABASE ----------------
    def create_db(self):
        self.conn = sqlite3.connect("ps5_games.db")
        self.cursor = self.conn.cursor()

        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY,
            title TEXT,
            genre TEXT,
            studio TEXT,
            year INTEGER,
            rating INTEGER,
            status TEXT
        )
        """)
        self.conn.commit()

    # ---------------- UI ----------------
    def create_ui(self):
        frame = tk.Frame(self.window)
        frame.pack(pady=10)

        tk.Label(frame, text="Game Title").grid(row=0, column=0)
        self.title_entry = tk.Entry(frame)
        self.title_entry.grid(row=0, column=1)

        tk.Label(frame, text="Genre").grid(row=1, column=0)
        self.genre = ttk.Combobox(frame, values=[
            "Action", "Adventure", "Horror", "RPG", "Sports", "Shooter"
        ])
        self.genre.grid(row=1, column=1)

        tk.Label(frame, text="Studio").grid(row=2, column=0)
        self.studio_entry = tk.Entry(frame)
        self.studio_entry.grid(row=2, column=1)

        tk.Label(frame, text="Year").grid(row=3, column=0)
        self.year_entry = tk.Entry(frame)
        self.year_entry.grid(row=3, column=1)

        tk.Label(frame, text="Rating").grid(row=4, column=0)
        self.rating = tk.Scale(frame, from_=1, to=10, orient="horizontal")
        self.rating.grid(row=4, column=1)

        tk.Label(frame, text="Status").grid(row=5, column=0)
        self.status = ttk.Combobox(frame, values=["Installed", "Wishlist", "Completed"])
        self.status.grid(row=5, column=1)

        # SEARCH
        tk.Label(self.window, text="Search Game").pack()

        self.search_entry = tk.Entry(self.window)
        self.search_entry.pack(pady=5)

        # BUTTONS
        btn_frame = tk.Frame(self.window)
        btn_frame.pack(pady=10)

        tk.Button(btn_frame, text="Add", bg="green", fg="white",
                  command=self.add_game, width=12).grid(row=0, column=0, padx=5)

        tk.Button(btn_frame, text="Update", bg="blue", fg="white",
                  command=self.update_game, width=12).grid(row=0, column=1, padx=5)

        tk.Button(btn_frame, text="Delete", bg="red", fg="white",
                  command=self.delete_game, width=12).grid(row=0, column=2, padx=5)

        tk.Button(btn_frame, text="View", bg="black", fg="white",
                  command=self.view_games, width=12).grid(row=0, column=3, padx=5)

        tk.Button(btn_frame, text="Search", bg="orange", fg="white",
                  command=self.search_game, width=12).grid(row=0, column=4, padx=5)

        # LISTBOX
        self.listbox = tk.Listbox(self.window, width=90)
        self.listbox.pack()

        tk.Button(self.window, text="Load Selected", command=self.load_selected).pack(pady=5)

    # ---------------- FUNCTIONS ----------------
    def add_game(self):
        self.cursor.execute("""
        INSERT INTO games (title, genre, studio, year, rating, status)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (
            self.title_entry.get(),
            self.genre.get(),
            self.studio_entry.get(),
            self.year_entry.get(),
            self.rating.get(),
            self.status.get()
        ))

        self.conn.commit()
        self.view_games()
        messagebox.showinfo("Success", "Game added")

    def view_games(self):
        self.listbox.delete(0, tk.END)

        self.cursor.execute("SELECT * FROM games")
        rows = self.cursor.fetchall()

        self.games_data = rows

        for row in rows:
            self.listbox.insert(
                tk.END,
                f"{row[1]} | {row[2]} | {row[3]} | {row[4]} | Rating: {row[5]} | {row[6]}"
            )

    def search_game(self):
        self.listbox.delete(0, tk.END)

        search = self.search_entry.get()

        self.cursor.execute("""
        SELECT * FROM games
        WHERE title LIKE ? OR genre LIKE ? OR studio LIKE ?
        """, ('%' + search + '%', '%' + search + '%', '%' + search + '%'))

        rows = self.cursor.fetchall()
        self.games_data = rows

        if not rows:
            self.listbox.insert(tk.END, "No games found")
            return

        for row in rows:
            self.listbox.insert(
                tk.END,
                f"{row[1]} | {row[2]} | {row[3]} | Rating {row[5]}"
            )

    def load_selected(self):
        selected = self.listbox.curselection()
        if not selected:
            return

        game = self.games_data[selected[0]]
        self.selected_id = game[0]

        self.title_entry.delete(0, tk.END)
        self.title_entry.insert(0, game[1])

        self.genre.set(game[2])
        self.studio_entry.delete(0, tk.END)
        self.studio_entry.insert(0, game[3])

        self.year_entry.delete(0, tk.END)
        self.year_entry.insert(0, game[4])

        self.rating.set(game[5])
        self.status.set(game[6])

    def update_game(self):
        self.cursor.execute("""
        UPDATE games
        SET title=?, genre=?, studio=?, year=?, rating=?, status=?
        WHERE id=?
        """, (
            self.title_entry.get(),
            self.genre.get(),
            self.studio_entry.get(),
            self.year_entry.get(),
            self.rating.get(),
            self.status.get(),
            self.selected_id
        ))

        self.conn.commit()
        self.view_games()

    def delete_game(self):
        self.cursor.execute("DELETE FROM games WHERE id=?", (self.selected_id,))
        self.conn.commit()
        self.view_games()
        messagebox.showinfo("Deleted", "Game removed")


if __name__ == "__main__":
    PS5GameApp()
