# Website Management Guide (ABJ Upholstery)

This guide explains how to manage your website's content, specifically the **Portfolio**, and how to ensure your changes appear live.

## 1. Startup Protocol (Connect Website to Local Files)

**Step 1: check your location**
Look at the text in your terminal command line.

* **Case A:** Does it end with `\abj-website>`? -> You are good!
* **Case B:** Does it look like `\Users\ADMIN>`? -> You need to move.

**Case A (You are already in the folder):**
Run this to unlock security and start the server:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run dev
```

**Case B (You are in the wrong folder):**
Run this to move, unlock, and start:

```powershell
cd ".gemini\antigravity\scratch\ABJ Upholstery unlimited\abj-website"; Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run dev
```

**Step 2: Verify Connection**

1. Wait for the terminal to say **"Ready"**.
2. Open `http://localhost:3000` in your browser.
3. Refresh the page. If your images/text update, you are **Connected**.

---

## 2. Updating Portfolio Text

All project text is stored in one file: `app/data/projects.ts`.

1. Open `apps/data/projects.ts`.
2. Scroll to the project you want to edit (e.g., `id: "p2"`).
3. Edit the text inside the quotes `""`.
    * **Title:** `title: "New Name Here",`
    * **Description:** `description: "New description...",`
    * **Location:** `location: "Great Falls, VA",`
4. **Save the file** (`Ctrl + S`).
5. Check your browser. It should update instantly if `npm run dev` is running.

---

## 3. Updating Portfolio Images

This is a **2-Step Process**. You must (A) Add the file, and (B) Tell the code where it is.

### Step A: Add the File

1. Go to the folder: `public/assets/portfolio/...`
2. Navigate to the specific project folder (e.g., `Project_02`).
3. Drag and drop your new images into the correct subfolder (`Before`, `After`, `Process`, or `Made_here`).
4. **Rule:** Keep filenames simple. No spaces. Use underscores.
    * ✅ `my_new_sofa.jpg`
    * ❌ `my new sofa (1).jpg`

### Step B: Update the Code

1. Open `app/data/projects.ts`.
2. Find the `images: { ... }` section for that project.
3. Add the path to your new image.
    * **Important:** The path always starts with `/assets/...`.
    * **Example:**

        ```typescript
        after: [
             "/assets/portfolio/Project_02/After/hero.jpg",
             "/assets/portfolio/Project_02/After/my_new_sofa.jpg" // <--- Added this line
        ]
        ```

4. **Save** (`Ctrl + S`).

---

## 4. Troubleshooting: "It's Not Updating!"

If you changed a photo but don't see it:

1. **Check the Server:** Is `npm run dev` running in the terminal?
2. **Check the Filename:** Does the code match the file **EXACTLY**?
    * `Image.jpg` is NOT the same as `image.jpg`.
    * `Project_01` is NOT the same as `project_01`.
3. **Hard Refresh:** Your browser might be remembering the old version.
    * Press `Ctrl` + `F5` (Windows) to force a reload.

---

## 5. How to Publish to the Live Website (The "Go Live" Button)

When you save files on your computer, they update **Localhost** immediately.
To update `abjupholstery.com`, you must **Publish** them.

I have created a special "Magic Button" script for you.

**The Steps:**

1. Make all your changes (add photos, edit text) and verify them on `localhost:3000`.
2. Open your project folder in File Explorer.
3. Double-click the file named **`deploy_updates.bat`**.
4. A black window will appear, show some text, and then say "SUCCESS".
5. Wait 2 minutes. Your live website is now updated.

> **Note:** You do NOT need to type code commands to update the site anymore. Just double-click `deploy_updates.bat`.
