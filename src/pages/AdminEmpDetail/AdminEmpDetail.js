
import "./AdminEmpDetails.style.css";


export function AdminEmpDetail() {

    return (
        <>
        <div className="emp-detail-page">
           <div className="page-container">
             <div className="profile-card">
           <div className="profile-card-header"><b>John Doe</b></div>
             
             <div className="Profile-card-row"><b>First Name</b>
             <div classname="name-field">John</div>
           </div>
           <div className="Profile-card-row"><b>Last Name</b>
           <div classname="name-field">Doe</div>
         </div>
         <div className="Profile-card-row"><b>Manager</b>
         <div classname="name-field">Jeff Miller</div>
       </div>
       <div className="Profile-card-row"><b>Phone Number</b>
       <div classname="name-field">314-888-8888</div>
     </div>
     <div className="Profile-card-row"><b>Email</b>
     <div classname="name-field">jdoe@pwi.com</div>
   </div>
   <div className="Profile-card-row"><b>Clock Status</b>
   <div classname="name-field">Clocked-in</div>
 </div>
           </div>

<div className="timesheet">
<div className="header-bar">May 1st-6th</div>
<div className="record">
<div className="date-box">Mon
<div className="month-day">May 1st</div>
</div>
<div className="hours-box">7:00AM - 4:00PM
<div className="daily-total">8h 00m</div>
</div>
</div>
<div className="record">
<div className="date-box">Mon
<div className="month-day">May 1st</div>
</div>
<div className="hours-box">7:00AM - 4:00PM
<div className="daily-total">8h 00m</div>
</div>
</div>
<div className="record">
<div className="date-box">Mon
<div className="month-day">May 1st</div>
</div>
<div className="hours-box">7:00AM - 4:00PM
<div className="daily-total">8h 00m</div>
</div>
</div>
<div className="record">
<div className="date-box">Mon
<div className="month-day">May 1st</div>
</div>
<div className="hours-box">7:00AM - 4:00PM
<div className="daily-total">8h 00m</div>
</div>
</div>
<div className="record">
<div className="date-box">Mon
<div className="month-day">May 1st</div>
</div>
<div className="hours-box">7:00AM - 4:00PM
<div className="daily-total">8h 00m</div>
</div>
</div>
<footer className="footer-bar">
<div className="sheet-totals">40hrs 0min</div>
</footer>



</div>
</div>



           </div>
           
           
        </>
    );
}