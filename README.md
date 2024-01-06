# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal database is breached. 
Only the user is able to update their own data.


**1. How does the client insure that their data has not been tampered with? Assume that the database is compromised.**
SOLN:
Data is sent along with the hash data. This hash acts as the checksum to ensure the integrity of the data. Additionally, a new route to retrive the original data has been added. 
<br />
**2. If the data has been tampered with, how can the client recover the lost data?**
SOLN: 
A backup database has been added that would restore the database and send the legitimate data to the user.

Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
