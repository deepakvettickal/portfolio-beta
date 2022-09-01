import React from "react";
import "./card.css";

const Card = ({ order }) => {
  console.log("order", order);
  const cardContent = {
    0: {
      id: "intro",
      title: "hi, I'm Deepak ",
      content: "This is my first react project!"
    },
    1: {
      id: "mace",
      type: "Education",
      title: "BTech in Computer Science",
      year: "2016 - 2020",
      content: "I did my bachelors here at MACE.",
      location: "Kothamangalam, Kerala, India",
      image: ""
    },
    3: {
      id: "iqvia",
      type: "Experience",
      title: "Software Developer - IQVIA",
      year: " 2020 - 2021",
      content:
        "Mostly worked with reporting tools like Tableau, a bit of Python too.",
      location: "Kochi, Kerala, India",
      image: ""
    },
    2: {
      id: "uob",
      type: "Education",
      title: "MSc in Advanced Computer Science",
      year: "2021 - 2022",
      content:
        "Learned a lot here at the University of Birmingham, from software development to cybersecurity.",
      location: "Birmingham, United Kingdom",
      image: ""
    },
    4: {
      id: "inrix",
      type: "Experience",
      title: "Data Journalist - Inrix",
      year: "2022 - present",
      content:
        "Currently working here part-time, using Inrix's mapping tool to report road blocking incidents in US.",
      location: "Quinton, Birmingham, United Kingdom",
      image: ""
    },
    5: {
      id: "outro",
      title: "Get in touch",
      email: "deepakvettickal@gmail.com",
      phone: "+44 7825576871"
    }
  };
  if (order !== 0 && order !== 5) {
    return (
      <div className="card">
        <h2>{cardContent[order].title}</h2>
        <h6>{cardContent[order].location}</h6>
        <h6>{cardContent[order].year}</h6>
        <p>{cardContent[order].content}</p>
      </div>
    );
  } else if (order === 0) {
    return (
      <div className="card">
        <h2>{cardContent[order].title}</h2>
        <p>{cardContent[order].content}</p>
      </div>
    );
  } else {
    return (
      <div className="card">
        <h2>{cardContent[order].title}</h2>
        <p>{cardContent[order].email}</p>
        <p>{cardContent[order].phone}</p>
      </div>
    );
  }
};

export default Card;
