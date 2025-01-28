document.addEventListener("DOMContentLoaded", async function () {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          alert("User registered successfully!");
          window.location.href = "index.html";
        } else {
          const errorText = await response.text();
          alert("Registration failed: " + errorText);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          alert("Logged in successfully!");
          window.location.href = "notes.html";
        } else {
          const errorText = await response.text();
          alert("Login failed: " + errorText);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred during login.");
      }
    });
  }

  if (window.location.pathname.endsWith("edit-note.html")) {
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get("id");

    if (noteId) {
      fetch(`/api/notes/${noteId}`, {
        method: "GET",
      })
        .then((resp) => {
          if (!resp.ok) throw new Error("Failed to fetch note");
          return resp.json();
        })
        .then((data) => {
          document.getElementById("content").value = data.content;
        })
        .catch((err) => {
          console.error(err);
          alert("Could not load the note.");
        });
    }
  }

  const createNoteForm = document.getElementById("createNoteForm");
  if (createNoteForm) {
    createNoteForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const content = document.getElementById("content").value;

      try {
        const response = await fetch("/api/notes", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (response.ok) {
          alert("Note created successfully!");
          window.location.href = "notes.html";
        } else {
          const errorText = await response.text();
          alert("Failed to create note: " + errorText);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred.");
      }
    });
  }

  const editNoteForm = document.getElementById("editNoteForm");
  if (editNoteForm) {
    editNoteForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const params = new URLSearchParams(window.location.search);
      const noteId = params.get("id");
      if (!noteId) {
        alert("No note ID provided.");
        return;
      }

      const content = document.getElementById("content").value;

      try {
        const response = await fetch(`/api/notes/${noteId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (response.ok) {
          alert("Note updated successfully!");
          window.location.href = "notes.html";
        } else {
          const errorText = await response.text();
          alert("Failed to update note: " + errorText);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while updating the note.");
      }
    });
  }

  const notesContainer = document.getElementById("notes");
  if (notesContainer) {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const notesData = await response.json();

        notesContainer.innerHTML = "";

        notesData.forEach((note) => {
          const noteDiv = document.createElement("div");
          noteDiv.className = "note";

          const noteText = document.createElement("p");
          noteText.textContent = note.content;
          noteDiv.appendChild(noteText);

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.style.marginTop = "10px";
          deleteBtn.addEventListener("click", async (event) => {
            event.stopPropagation();

            if (!confirm("Are you sure you want to delete this note?")) return;
            try {
              const deleteResp = await fetch(`/api/notes/${note._id}`, {
                method: "DELETE",
                credentials: "include",
              });
              if (deleteResp.ok) {
                alert("Note deleted successfully!");
                noteDiv.remove();
              } else {
                const errorText = await deleteResp.text();
                alert("Failed to delete note: " + errorText);
              }
            } catch (err) {
              console.error(err);
              alert("An error occurred while deleting the note.");
            }
          });
          noteDiv.appendChild(deleteBtn);
          noteDiv.addEventListener("click", () => {
            window.location.href = `edit-note.html?id=${note._id}`;
          });

          notesContainer.appendChild(noteDiv);
        });
      } else {
        const errorText = await response.text();
        alert("Error fetching notes: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching notes.");
    }
  }
});
