# ⚡ Automation Expert Portfolio Website

A lightweight, professional freelancer portfolio website built with pure HTML, CSS, and JavaScript.
Designed for **Fiverr** and **Upwork** automation specialists — no backend, no frameworks, works perfectly on **GitHub Pages**.

---

## 📁 File Structure

```
your-portfolio/
│
├── index.html              ← Home page
├── portfolio.html          ← Portfolio with 5 service tabs
├── about.html              ← About me page
├── contact.html            ← Contact form (FormSubmit.co)
├── legal.html              ← Privacy Policy & Terms
├── 404.html                ← Custom 404 error page
│
├── css/
│   └── style.css           ← All styles for the entire website
│
├── js/
│   └── main.js             ← All JavaScript for the entire website
│
├── images/
│   ├── favicon.ico         ← Website icon (browser tab)
│   ├── profile.jpg         ← Your profile photo
│   └── projects/
│       ├── n8n/
│       │   ├── project-1-thumbnail.jpg
│       │   ├── project-1-screenshot-1.jpg
│       │   ├── project-1-screenshot-2.jpg
│       │   ├── project-1-screenshot-3.jpg
│       │   ├── project-2-thumbnail.jpg
│       │   └── project-2-screenshot-1.jpg
│       ├── zapier/
│       ├── gohighlevel/
│       ├── customgpt/
│       └── others/
│
├── robots.txt              ← SEO: tells Google to crawl the site
├── sitemap.xml             ← SEO: list of all pages for Google
└── README.md               ← This file
```

---

## ✏️ How to Edit

### 1. Change Your Name
Search for `Your Name` and `YourName` in all HTML files and replace with your real name.

### 2. Change Your Profile Photo
- Add your photo to: `images/profile.jpg`
- Recommended size: **500×500px** (square or portrait)

### 3. Change Colors
Open `css/style.css` and look at the top for `:root { ... }`.
Change the color values there to rebrand the entire website at once:
```css
--color-primary:   #2563eb;  /* Main blue */
--color-secondary: #8b5cf6;  /* Purple */
```

### 4. Change Your Headline
In `index.html`, find:
```html
<h1 class="hero-title">n8n & AI Automation Expert</h1>
```
Change the text inside `<h1>` to your real headline.

### 5. Change Stats (Projects, Clients, etc.)
In `index.html`, find the `hero-stats` section and update the numbers.
Do the same in `about.html` in the `about-achievements` section.

### 6. Update Your Social Links
Search for `YOUR_USERNAME` and `YOUR_PROFILE` in all HTML files.
Replace with your real Fiverr username, Upwork profile URL, LinkedIn handle, and YouTube channel.

### 7. Update Your Email Address
Search for `your-email@example.com` in all HTML files.
Replace with your **real email address**.

> ⚠️ **IMPORTANT for FormSubmit:** After you replace the email in `contact.html`,
> submit the form once on your live site. FormSubmit will send you a confirmation email.
> Click the confirmation link to activate your form. After that, all form submissions go to your inbox.

---

## 📸 How to Change Images

All image paths follow this pattern:
```
images/projects/n8n/project-1-thumbnail.jpg
images/projects/n8n/project-1-screenshot-1.jpg
```

To add your real project images:
1. Create the folder structure: `images/projects/n8n/`, `images/projects/zapier/`, etc.
2. Add your images with matching names, OR change the `src=""` path in the HTML to match your file names.

**Recommended image sizes:**
- Thumbnails: **600×400px**
- Screenshots: **1200×750px** (wide, 16:10 ratio)
- Profile photo: **500×500px**

---

## 🎬 How to Change YouTube Video IDs

In each project detail panel in `portfolio.html`, find:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE" ...>
```

To get the video ID:
- If your video URL is: `https://youtu.be/abc123xyz` → ID is `abc123xyz`
- If your video URL is: `https://www.youtube.com/watch?v=abc123xyz` → ID is `abc123xyz`

Replace `YOUR_VIDEO_ID_HERE` with your real ID.

---

## ➕ How to Add a New Project

1. Open `portfolio.html`
2. Find the tab you want to add a project to (e.g., `<!-- TAB: n8n -->`)
3. Find a comment that says `<!-- PROJECT CARD START (n8n - Project 2) -->`
4. Copy the entire block from `<!-- PROJECT CARD START -->` to `<!-- PROJECT CARD END -->`
5. Paste it directly after the last project card, before `</div><!-- end projects-grid -->`
6. Give the new card a unique `data-project-id` like `n8n-3`
7. Give the "View Details" button a unique `data-target` like `detail-n8n-3`
8. Create a matching detail panel: copy an existing `<div class="project-detail" id="detail-n8n-2">` block, change the id to `detail-n8n-3`, and update all content inside.

---

## 📧 How to Update FormSubmit Email

In `contact.html`, find:
```html
<form action="https://formsubmit.co/your-email@example.com" ...>
```
Replace `your-email@example.com` with your real email.

Also update the redirect URL:
```html
<input type="hidden" name="_next" value="https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/contact.html?success=true" />
```
Replace with your real GitHub Pages URL.

---

## 🌐 How to Host on GitHub Pages

**Step-by-step:**

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one.

2. **Create a new repository:**
   - Click the `+` button → "New repository"
   - Name it something like `automation-portfolio`
   - Set to **Public**
   - Click "Create repository"

3. **Upload your files:**
   - Click "uploading an existing file" on the new repo page
   - Drag and drop ALL your files and folders
   - Commit the upload

4. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**
   - Under "Source", select `Deploy from a branch`
   - Branch: `main` | Folder: `/ (root)`
   - Click **Save**

5. **Your site will be live at:**
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`
   
   GitHub Pages usually takes 1–3 minutes to go live.

6. **After it's live:**
   - Update `robots.txt` and `sitemap.xml` with your real URL
   - Update the FormSubmit `_next` redirect URL
   - Submit your sitemap to [Google Search Console](https://search.google.com/search-console)

---

## 🔧 Technologies Used

- Pure **HTML5** — no frameworks
- Pure **CSS3** — no Bootstrap or Tailwind
- Pure **JavaScript** — no jQuery
- **FormSubmit.co** — free contact form service for static sites
- **YouTube embeds** — for project demo videos
- Hosted on **GitHub Pages** — free static hosting

---

## 📝 Legal Reminder

Before publishing, review `legal.html` and:
- Update the "Last updated" date
- Replace `your-email@example.com` with your real email
- Review the Privacy Policy to ensure it matches how you actually use data
- Review the Terms & Conditions to match your actual service policies

---

## 💡 Tips for Getting Clients

1. **Add real screenshots** — even blurred ones are better than placeholders
2. **Record a short Loom/YouTube demo** for each project and embed it
3. **Update your stats** to real numbers (don't exaggerate)
4. **Link to your live Fiverr/Upwork gigs** throughout the site
5. **Keep it fast** — avoid large images (compress with [TinyPNG](https://tinypng.com))

---

*Built with ❤️ for automation freelancers. Good luck with your portfolio!*
