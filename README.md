# Online Drive - File Management Application

## Overview

Welcome to the Online Drive project! This web application allows users to manage files with functionalities similar to Google Drive. The project is divided into two modules, with a focus on basic operations and some exciting bonus features.

## Tech Stack
- **React Js** - Popular Frontend Library
- **Tailwind CSS** - for styling the UI
- **React Icons** - An Icon Library 
- **Next UI** - A Components library for creating the create and rename modals

### Module 1: Browsing and Creating (Basic Functionalities)

- **Browse:** You can double-click on any folder to navigate through its contents.
- **Create:** Easily create both files and folders in nested way also.
- **Delete:** Remove unwanted files and folders effortlessly.
- **Rename:** You can also Modify the names of files and folders with ease.

### Module 2: Bonus Functionalities

Even though I was supposed to complete the basic functionality but I also tried to complete the Bonus Functionality as well

- **Advance React Hooks:** Utilized advanced React hooks like *useContext* hooks for enhanced functionality.
- **Sidebar:** Implemented a sidebar displaying all folders and files for quick navigation and you can instanly see the changes in this side bar as well.
- **Breadcrumbs and Back Button:** Implemented seamless navigation using breadcrumbs and a convenient back button.
- **Prevent Duplicates:** Ensured no duplicate files or folders are created or renamed.
- **Hosting:** Successfully hosted the working solution for accessibility , You can visit the link : https://online-drive-task.vercel.app/.

## Note

I've focused on completing the basic functionalities as per the requirements. Backend operations were mimicked for create/rename/delete operations, and the data resides on the frontend(at local storage). I've utilized some external libraries for efficiency.

## Evaluation Criteria

Here's how I approached the evaluation criteria:

- **Completeness:** Ensured all basic functionalities are implemented (Bonus functionalities have also been implemented).
- **Data Structures:** Used the concept of tree data structures in the Object storing the files and folders consisting of their name , type and their childrens .
    - Along with that , In breadcrumbs component , I have tried to use the concepts of stack in slighly easy logic
- **ES6, CSS & React:** Demonstrated knowledge of ES6, CSS, and React.
- **Modularity and Reusability:** Code is modular and the components like SingleEntity are reusable for better maintainability.
- **Attention to Detail:** Paid attention to details and the also made the app responsive to different devices and maintained code quality.

## How to Run Locally

To run the completed Online Drive project on your local machine:

1. Clone the repository: `git clone https://github.com/amanbairagi30/online-drive.git`
2. Navigate to the project directory: `cd [project_directory]`
3. Run the command in the terminal: `npm install`
4. Start the application: `npm run dev`

## Project Structure

- **/assets:** Contains all project assets.
- **/Components:** Includes various React components.
- **/Pages:** Contains different pages of the application.
- **/context:** Includes all context apis files.

## Contact

For any questions or clarification, feel free to reach out:

- **Contact Person:** Aman Kumar Bairagi
- **Email:** amanbairagi1089@gmail.com

Thank you for reviewing the Online Drive project!
