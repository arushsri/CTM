# CTM
CTM Assignment 25

There are two independent websites: Centralized Website and ASMP Website.

# CENTRALIZED WEBSITE
Users can register on the centralized website using their name, roll number, hostel, password, and a unique username. These details will be stored in the PostgreSQL Database.

# ASMP WEBSITE
This is the independent website. It will first ask the user to log in using their credentials (username and password, which they used during registering on the centralized website). If the user has already registered on the centralized website, and the provided credentials are correct, then the user proceeds forward and the website retrieves the user information (in this case, the user's full name and roll number). Further, there is a preference management system which keeps records of the 5 mentor preferences of the user with an additional feature of changing the preferences after they have been submitted. Again, this information is being stored in a PostgreSQL Database.
