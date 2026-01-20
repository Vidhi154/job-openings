// import Card from "./components/Card.jsx";
import Navbar from "./components/Navbar.jsx";
import Val from "./components/Val.jsx";
import Card from "./components/Crdd.jsx";
const App = () => {
  const jobs = [
  {
    user: "amazon",
    ago: "5 days ago",
    im: "https://images.seeklogo.com/logo-png/40/2/amazon-icon-logo-png_seeklogo-405254.png",
    time: "part time",
    exp: "beginner",
    det: "Senior UI/UX Designer",
    cost: "$120/hr",
    location: "Remote"
  },
  {
    user: "google",
    ago: "2 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    time: "full time",
    exp: "intermediate",
    det: "Frontend Developer",
    cost: "$150/hr",
    location: "Bangalore"
  },
  {
    user: "microsoft",
    ago: "1 day ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    time: "full time",
    exp: "experienced",
    det: "Software Engineer",
    cost: "$140/hr",
    location: "Hyderabad"
  },
  {
    user: "meta",
    ago: "3 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
    time: "remote",
    exp: "intermediate",
    det: "React Developer",
    cost: "$130/hr",
    location: "Remote"
  },
  {
    user: "netflix",
    ago: "6 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
    time: "part time",
    exp: "beginner",
    det: "UI Designer",
    cost: "$110/hr",
    location: "Mumbai"
  },
  {
    user: "infosys",
    ago: "4 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    time: "full time",
    exp: "beginner",
    det: "System Engineer",
    cost: "$90/hr",
    location: "Pune"
  },
  {
    user: "tcs",
    ago: "2 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    time: "full time",
    exp: "beginner",
    det: "Java Developer",
    cost: "$85/hr",
    location: "Delhi"
  },
  {
    user: "wipro",
    ago: "7 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    time: "part time",
    exp: "intermediate",
    det: "Backend Developer",
    cost: "$95/hr",
    location: "Chennai"
  },
  {
    user: "accenture",
    ago: "3 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    time: "full time",
    exp: "experienced",
    det: "Cloud Engineer",
    cost: "$160/hr",
    location: "Noida"
  },
  {
    user: "ibm",
    ago: "5 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    time: "remote",
    exp: "intermediate",
    det: "Data Analyst",
    cost: "$145/hr",
    location: "Remote"
  },
  {
    user: "oracle",
    ago: "1 day ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    time: "full time",
    exp: "experienced",
    det: "Database Admin",
    cost: "$155/hr",
    location: "Gurgaon"
  },
  {
    user: "zoho",
    ago: "4 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Zoho-logo.png",
    time: "full time",
    exp: "beginner",
    det: "Web Developer",
    cost: "$80/hr",
    location: "Chennai"
  },
  {
    user: "swiggy",
    ago: "2 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
    time: "part time",
    exp: "beginner",
    det: "UI Intern",
    cost: "$60/hr",
    location: "Bangalore"
  },
  {
    user: "zomato",
    ago: "3 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
    time: "remote",
    exp: "intermediate",
    det: "Product Designer",
    cost: "$125/hr",
    location: "Remote"
  },
  {
    user: "flipkart",
    ago: "6 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flipkart_logo.png",
    time: "full time",
    exp: "experienced",
    det: "Tech Lead",
    cost: "$170/hr",
    location: "Bangalore"
  },
  {
    user: "paypal",
    ago: "2 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    time: "remote",
    exp: "intermediate",
    det: "Full Stack Developer",
    cost: "$150/hr",
    location: "Remote"
  },
  {
    user: "spotify",
    ago: "5 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    time: "part time",
    exp: "beginner",
    det: "Music App UI Designer",
    cost: "$100/hr",
    location: "Remote"
  },
  {
    user: "adobe",
    ago: "3 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Adobe_Logo.svg",
    time: "full time",
    exp: "experienced",
    det: "UX Researcher",
    cost: "$165/hr",
    location: "Noida"
  },
  {
    user: "linkedin",
    ago: "1 day ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    time: "remote",
    exp: "intermediate",
    det: "Product Manager",
    cost: "$180/hr",
    location: "Remote"
  },
  {
    user: "uber",
    ago: "4 days ago",
    im: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    time: "full time",
    exp: "experienced",
    det: "Mobile App Developer",
    cost: "$160/hr",
    location: "Hyderabad"
  }
];



  return (
    <div className="parent">

      {jobs.map((job, index) => (
        <Card
          key={index}
          user={job.user}
          ago={job.ago}
          im={job.im}
          time={job.time}
          exp={job.exp}
          det={job.det}
          cost={job.cost}
          location={job.location}
        />
      ))}

      {/* {arr.map((e)=>{
        return <Card user='amazon' ago='5 days ago' im='https://images.seeklogo.com/logo-png/40/2/amazon-icon-logo-png_seeklogo-405254.png' time='part time' exp='beginner' det='Senior UI/UX Designer' cost="$120/hr" location="Remote"/>
      })} */}

      {/* <Card user='amazon' ago='5 days ago' im='https://images.seeklogo.com/logo-png/40/2/amazon-icon-logo-png_seeklogo-405254.png' time='part time' exp='beginner' det='Senior UI/UX Designer' cost="$120/hr" location="Remote"/>
      <Card user='google' ago='2days ago' im='https://thumbs.dreamstime.com/b/google-logo-vector-format-white-background-illustration-407571048.jpg' time='full time' exp='experienced' det='Frontend Developer' cost="$150/hr" location="on-site"/>
      <Card user='meta' ago='1 day ago' im='https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' time='internship' exp='fresher' det='Backend Developer' cost="$100/hr" location="hybrid"/>
      <Card user='netflix' ago='3 days ago' im='https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png?quality=90&strip=all&crop=0%2C9.7231879908377%2C100%2C80.553624018325&w=1200' time='part time' exp='beginner' det='Full Stack Developer' cost="$130/hr" location="Remote"/>
      <Card user='spotify' ago='4 days ago' im='https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' time='full time' exp='experienced' det='Data Scientist' cost="$160/hr" location="on-site"/>
      <Card user='airbnb' ago='6 days ago' im='https://cdn3d.iconscout.com/3d/free/thumb/free-airbnb-3d-icon-png-download-4798242.png' time='internship' exp='fresher' det='DevOps Engineer' cost="$110/hr" location="hybrid"/> */}
      {/* <Navbar/> */}
      {/* <Val user="vidhi" im="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"/> */}

    </div>
     
  )
}

export default App
