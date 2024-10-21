
### How It Works:
1. **State Management**: Redux is used to manage the state of scraped styles.
2. **User Interface**: 
   - Input for the Shopify URL and a "Scrap" button.
   - A switch to toggle between JSON format and component format.
   - Displays results in two columns for fonts and primary button styles.
   - If there are multiple font styles, they are displayed in a list.

### Running the Application

1. **Run the Backend**:

Ensure your backend server is running:

```bash
cd backend
npm install
ts-node index.ts
```

2. **Run the Fronend**:

Ensure your frontend is running:

```bash
cd frontend
npm install
npm start
```