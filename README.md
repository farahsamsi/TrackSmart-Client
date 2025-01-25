# Asset Management System (TrackSmart)

This project is a MERN stack web application built to help businesses efficiently manage their assets and products. The system is designed to enable HR Managers and employees to track and manage company assets, ensuring smooth operations and better asset utilization.

---

## Live Site

[Asset Management System - Live Demo](https://tracksmart-466af.web.app) _(https://tracksmart-466af.web.app)_

---

## Demo HR Credentials

- **Username:** asset@hr.com
- **Password:** 123456789

---

## Key Features

1. **User Roles**:

   - Separate roles for HR Managers and Normal Employees.
   - Role-based access to features and functionalities.

2. **Asset Categories**:

   - Assets are categorized as Returnable (e.g., laptops, desks) and Non-returnable (e.g., pens, tissue paper).

3. **Responsive Design**:

   - Fully responsive for mobile, tablet, and desktop views.

4. **Authentication**:

   - Secure login and signup with email/password and social login (Google).
   - JWT implementation for authentication.

5. **Dynamic Content**:

   - Customized dashboards for HR Managers and employees based on user roles.

6. **CRUD Operations**:

   - Easy creation, retrieval, updating, and deletion of assets and user information.

7. **Notification System**:

   - Sweet alerts and toast notifications for feedback on actions like login, signup, asset requests, and more.

8. **Advanced Search and Filter**:

   - Server-side search and filter functionality for assets and requests.

9. **Data Visualization**:

   - Pie chart visualization for returnable vs. non-returnable assets.

10. **Payment Integration**:

    - HR Managers can upgrade their account by selecting packages (e.g., $5 for 5 employees).

11. **Pagination**:

    - Efficient data display with pagination for all tables.

12. **Helmet Integration**:
    - Improved SEO and document head management using React Helmet.

---

## Installation and Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/asset-management-system.git
    ```

2.  **Navigate to the Project Directory:**

    ```bash
    cd asset-management-system
    ```

3.  **Install Dependencies:**

    - Client:
      ```bash
      npm install
      ```

4.  **Set Environment Variables:**

    - Create a `.env` file in `client` directories.
    - Add the following variables: - For the client:

      ```env
      VITE_apiKey=
      VITE_authDomain=
      VITE_projectId=
      VITE_storageBucket=
      VITE_messagingSenderId=
      VITE_appId=

      VITE_IMAGE_HOSTING_KEY=

      VITE_payment_gateway_pk=
      ```

5.  **Run the Application:**

    - Start the client:
      ```bash
      npm run dev
      ```

---

## Technologies Used

### Frontend

- React.js
- Tailwind CSS
- DaisyUI
- Axios
- TanStack Query
- mui/material
- ag-media/react-pdf-table
- emotion/react
- emotion/styled
- react-pdf/renderer
- stripe/react-stripe-js
- stripe/stripe-js
- tanstack/react-query
- React Helmet
- SweetAlert2
- chart.js
- date-fns
- firebase
- React-Icons

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## Pages and Functionalities

### Without Login

- **Home Page:**
  - Banner Section with navigation buttons to "Join as HR Manager" and "Join as Employee."
  - Static About and Packages sections.
- **Join as Employee Page:**
  - Form to register as an employee.
  - Google Social Login.
- **Join as HR Manager Page:**
  - Form to register as an HR Manager.
  - Payment integration for package selection.
- **Login Page:**
  - Login form with email/password.
  - Google Social Login.

### After Login (Normal Employee)

- **Home Page:**
  - Pending Requests.
  - Monthly Requests.
  - Additional Sections (e.g., HR tips, Events).
- **My Assets:**
  - View requested assets.
  - Search and filter requests.
  - Cancel or return assets.
  - Print details for approved assets.
- **Request for Asset:**
  - Search and filter available assets.
  - Request modal with notes.
- **My Team:**
  - View team members.

### After Login (HR Manager)

- **Home Page:**
  - Pending Requests.
  - Top Requested Items.
  - Limited Stock Items.
  - Pie Chart visualization of asset types.
- **Asset List:**
  - Search, filter, and sort assets.
  - Update and delete options.
- **Add an Asset:**
  - Form to add new assets.
- **All Requests:**
  - Search requests.
  - Approve/Reject requests.
- **My Employee List:**
  - Manage team members.
  - Remove members from the team.
- **Add an Employee:**
  - Add multiple members at once.
  - Upgrade member limit with payment.
- **Profile Page:**
  - View and update personal information.

---

## Challenges Implemented

1. **JWT Authentication:** Secure token-based authentication.
2. **TanStack Query:** For efficient data fetching.
3. **Pagination:** Implemented across all data tables.
4. **React Helmet:** Enhanced SEO and document head management.
5. **Bulk Add Employees:** Single API call to add multiple employees to a team.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.
