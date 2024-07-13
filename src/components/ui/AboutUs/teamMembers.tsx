const TeamMembers = () => {
  const TeamMembers = [
    {
      name: "Alice Johnson",
      role: "CEO",
      bio: "Alice has over 20 years of experience in the industry and is the visionary behind our company.",
    },
    {
      name: "Bob Smith",
      role: "CTO",
      bio: "Bob is a tech genius with a passion for innovation and has been leading our tech team for 10 years.",
    },
    {
      name: "Carol White",
      role: "CFO",
      bio: "Carol ensures our financial stability and has a keen eye for strategic growth.",
    },
  ];
  return (
    <div>
      <h2>Meet Our Team</h2>
      {TeamMembers.map((member, index) => (
        <div key={index}>
          <h3>
            {member.name} - {member.role}
          </h3>
          <p>{member.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
