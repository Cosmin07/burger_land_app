This app is an React app built using TypeScrypt, Zustand for state management and Vitest for testing.

The app present a flow for users that want to buy an ticket for an day in the Burger Land.

The flow is described in the following diagram:

+--------------------+
|      Home Page     ||
+--------------------+
          |
          v
+--------------------+
|    Start to plan a day    |
|    (Click button to open modal from) |
+---------------------------+
          |
          v
+--------------------+
|  Complete personal info    |
|     (Select day)           |
+--------------------+
          |
          v          
+--------------------+
|  Select Tickets    |
| (Standard/Family)  |
+--------------------+
          |
          v
+--------------------+
|    Add-Ons        |
|  (Restaurant)     |
+--------------------+
          |
          v
+--------------------+
|  Confirmation Page |
| (Booking Summary)  |
+--------------------+
          |
          v
+--------------------+
|     Checkout      |
|      (Pay)        |
+--------------------+

To start the app do the following steps:

1.Open a the burgerland folder in a terminal
2. run > npm install
3. run > npm run dev