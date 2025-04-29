# 🚀 Assignment 1 – AI-Powered Check-In App for Front-End Workshop

## 📅 Event Overview
On **June 5th**, our Front-End team will host a workshop with **40 industry experts** to explore the potential of **AI tools**. Participants will be grouped into **teams of five** to solve a business case collaboratively.

To ensure balanced teams, we need an **AI-assisted check-in application** that gathers participants' expertise and experience, analyzes the input via a **large language model (LLM)**, and assigns participants to appropriate teams.

---

## 🧩 Your Assignment

You are tasked with building a full-stack check-in application that:
- Collects questionnaire data from participants
- Sends this data to an LLM for analysis
- Returns a team assignment for each participant
- Ensures teams are balanced based on expertise and experience

---

## 🎨 Design

A Figma design file is available to guide the UI/UX:

👉 [Figma Link](https://www.figma.com/design/P4OaJ7FpxZuTL1AedeehUs/Untitled?node-id=0-1&m=dev&t=Iie4IddpEgtDLai9-1)

---

## 🛠️ Recommended Tools

- **Cursor** – AI-powered code editor  
- **Next.js** – Fullstack React framework  
- **Vercel** – Deployment platform for frontend and serverless functions  
- **Microsoft 365 CoPilot API** – [API Docs](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-api-plugins)

> 🔧 **Note**: To enable API access, you may need to **disable Zscaler**:
```bash
sudo launchctl unload /Library/LaunchDaemons/com.zscaler.service.plist
sudo launchctl unload /Library/LaunchDaemons/com.zscaler.tunnel.plist
```

---


## ✅ Functional Requirements

The application should include the following features:

1. **Form-based Data Collection**:
   - Collect participant information, such as expertise, years of experience, and areas of interest.
   - Ensure that all relevant fields are filled out by the participant before submitting.

2. **Input Validation**:
   - Ensure that all form fields are validated to prevent incomplete submissions.
   - Include clear error messages when validation fails (e.g., missing required fields).

3. **Integration with Large Language Model (LLM)**:
   - The collected data should be sent to a large language model (LLM) for processing.
   - The LLM will analyze the participant's data and return a team assignment based on their expertise and experience.

4. **Team Assignment**:
   - Each participant will be assigned to a team of five, ensuring balanced teams based on the data provided.
   - The team assignment should be returned and displayed to the participant immediately after form submission.

5. **Persistent Storage**:
   - Store the responses temporarily to ensure all participants’ data is collected before final processing.
   - Consider using a database or in-memory storage to manage participant responses until all are submitted.

---

## 💡 Tips for Success

Here are some best practices and ideas to help you complete the project:

1. **Automate Figma-to-Code Workflows**:
   - Use tools that can help automate the process of translating Figma designs into code. This can speed up UI development and reduce errors.

2. **Libraries for Faster Development**:
   - Consider using libraries like **React Hook Form** for efficient form handling, **Axios** for API requests, and **Zustand** or **Redux** for state management.
   - Use **Tailwind CSS** or **MUI** for quicker styling and responsiveness.

3. **Asynchronous Handling**:
   - Handle asynchronous operations (e.g., submitting data to the LLM, retrieving team assignments) properly to ensure smooth user experience.
   - Consider using **React Query** or **SWL** for data fetching and caching to minimize unnecessary API calls.

4. **User Experience**:
   - Provide feedback to users during the form submission process (e.g., loading indicators, success/failure messages).
   - Make sure the team assignment result is clearly displayed and easy to understand.

---

## 🚀 Getting Started

To get up and running with the project:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/assignment-1.git
    ```

2. **Install dependencies**:
    Navigate to the project directory and install the required dependencies:
    ```bash
    cd assignment-1
    npm install
    ```

3. **Set up Environment Variables**:
    - Create a `.env.local` file in the root of the project and add your API keys and necessary configurations for the CoPilot API, LLM, and other integrations.

4. **Run the Development Server**:
    Start the development server with:
    ```bash
    npm run dev
    ```

5. **Connect to the Microsoft 365 CoPilot API**:
    - Set up authentication and integrate the CoPilot API to send participant data for team assignment analysis.
    - Follow the API documentation to connect and handle responses.

6. **Deploy to Vercel**:
    - Deploy the application to Vercel for public access:
    ```bash
    vercel
    ```

---

