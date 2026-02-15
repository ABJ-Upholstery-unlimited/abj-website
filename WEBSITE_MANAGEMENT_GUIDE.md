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

---

## 6. Updating Contact Information (WhatsApp/Phone)

The phone number and WhatsApp connection are set in the code.

**To Update the Phone Number (300-400-4503):**

1. Search your project for "300-400-4503" (in `layout.tsx` or `Footer.tsx`).
2. Replace it carefully.

**To Update the WhatsApp Number:**

1. Open `components/QuickQuote/ProjectBoard.tsx`.
2. Search for `handleWhatsApp`.
3. You will see a link starting with `https://wa.me/13004004503`.
4. Change the number. **Important:** It must start with `1` (country code) and have no dashes `13014004503`.

---

## 7. Updating "Tips" & "Reviews"

These are usually hardcoded in the main page.

1. Open `app/page.tsx`.
2. Search for the specific review text or tip title you want to change.
3. Edit the text inside the quotes or tags.
4. Save.

---

## 8. 🚨 FIXING AUTH (The "Unbreakable" Connection)

If you see "Invalid Grant" or "System Error: Google Integration Failed", your personal login token has expired.
To fix this **FOREVER**, we use a **Service Account** (Robot Account).

### Step 1: Create the Robot Account

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Select your project (e.g., "ABJ Quote Tool").
3. Search for **Service Accounts**.
4. Click **+ CREATE SERVICE ACCOUNT**.
5. **Name:** `abj-website-bot`. Click **Create & Continue**.
6. **Role:** Select `Editor` (or `Drive File Editor` and `Sheets Editor`). Click **Continue** -> **Done**.

### Step 2: Get the Key (JSON File)

1. Click on the new email address created (`abj-website-bot@...`).
2. Go to the **KEYS** tab.
3. Click **ADD KEY** -> **Create new key**.
4. Select **JSON**. Click **CREATE**.
5. A file will download. **Rename it to:** `service-account.json`.

### Step 3: Install the Key

1. Move `service-account.json` into your project folder:
   `C:\Users\ADMIN\.gemini\antigravity\scratch\ABJ Upholstery unlimited\abj-website\`
   (Right next to `package.json` and `google-oauth.json`).

### Step 4: Grant Permission (CRITICAL)

The robot account needs permission to touch your folders. You need its special email address.

**How to find the Robot's Email:**

* **Option A (Console):** Look at the list where you created the key. The email is in the column labeled **"Email"** (e.g., `abj-quote-bot@...`).
    It usually ends in `.iam.gserviceaccount.com`.
* **Option B (JSON File):** Open the `service-account.json` file you just downloaded. Look for `client_email`.

**The Steps:**

1. Copy that email address.
2. Go to your **Google Drive**.
3. Right-click the folder where Quotes are saved ("ABJ Smart Quotes").
4. Click **Share**.
5. Paste the robot's email.
6. Make sure it says **Editor**. Uncheck "Notify people" if you want.
7. Click **Share**.
8. **Repeat** this for your Google Sheet ("ABJ Quotes").

### Step 5: Connect the Folder ID

**✅ VERIFIED:**
Your "QUICK_QUOTE" folder ID is: `1XBEQolgIN8R8RgVUj1XVIoOBw6ih7yff`

This ID is already programmed into the system. You do not need to do anything here.

**✅ Done!** The system will now detect `service-account.json` and use it. It will never expire.
