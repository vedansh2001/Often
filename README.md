# AI-Native Travel Platform – Invite Form Replica

This project is a pixel-perfect, modern invite form built as part of a frontend assignment for an AI-native travel platform. The focus is on UI craft, design detail, and seamless integration of advanced tooling like Remotion for video rendering.

## ✨ Features

- **Pixel-Perfect Invite Form**: Faithfully recreates the provided invite form design, including:
  - Theme selection (supports both MP4 video and image backgrounds)
  - Cover image upload (separate from background theme)
  - Event Name, Start Date, Description, Capacity, and Require Approval fields
  - Responsive, clean, and accessible layout
- **MP4 & Image Theme Support**: Select an MP4 or image as the invite background. The preview updates instantly to reflect your choice.
- **Save & Preview**:
  - **Save Invite**: Persists form data using dummy data (see `creating.json` and `response.json` in `public/data/`)
  - **Preview**: Instantly view the rendered invite at `/view` with all selected options
- **Remotion Video Integration**:
  - Invite is rendered as a video using [Remotion.dev](https://www.remotion.dev/)
  - **Download as Video**: Export and download the invite as an MP4, including all content and background
- **Modern Tech Stack**:
  - [Next.js](https://nextjs.org/) (React framework)
  - Tailwind CSS for styling
  - Zustand for state management
  - Remotion for video rendering

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open** [https://often-xi.vercel.app](https://often-xi.vercel.app) to view the app.

- Edit the invite form at `/create`
- Preview the invite at `/view`

## 📦 Project Structure

- `src/app/create/` – Invite creation form UI
- `src/app/view/` – Invite preview and video export
- `src/components/` – UI components (form fields, Remotion player, etc.)
- `public/data/creating.json` – Dummy data for invite creation
- `public/data/response.json` – Dummy data for invite viewing

## 🛠️ Tech Stack
- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Video**: Remotion
