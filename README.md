Smart Student ID Generator
This project is a ReactJS-based web application that allows users to generate student ID cards with dynamic data input, QR code generation, multiple templates, and PNG download functionality. It also supports saving, viewing, downloading, and deleting previously created cards.

Features
Form to input student details (name, ID, department, allergies, etc.)
Upload student photo URL
Choose from multiple templates
QR code generation with student info
Save ID cards in localStorage
Download the ID card as a PNG file
Delete previously saved cards
Technologies Used
ReactJS (via Create React App)
Tailwind CSS for styling
html2canvas for screenshot and image download
react-qr-code for QR code generation
LocalStorage API for saving cards
Project Structure
Everything is implemented in a single file for simplicity:

How It Works
1. User Form
The user fills out the student ID form including name, ID, department, photo URL, etc.
Template selection allows switching between classic and modern styles.
2. Generate ID Card
On form submission, the data is stored in a React state and displayed on the screen with styling and a generated QR code.
The QR code encodes the full student information as a JSON string.
3. Download ID Card
Uses html2canvas to capture the card as a PNG image.
Automatically triggers download with student name as the file name.
4. Save and Load Cards
On submission, card data is saved to browser localStorage.
All previously saved cards are displayed with options to download or delete.
Installation & Run Locally
npm install npm start

-> Developed By - Naveen Gera
