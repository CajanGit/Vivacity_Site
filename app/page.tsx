import TeamCard from './components/TeamCard'
export default function Home() {
  return (

    // flex = best for one direction at a time
    // grid = best for two dimesnions at once, rows + columns, etc
    
    <div className="flex flex-col items-center pt-50">
      <main className="flex gap-30 justify-center flex-wrap">
        <TeamCard image="/images/team1.jpg" label="Teams" />
        <TeamCard image="/images/team1.jpg" label="Socials" />
        <TeamCard image="/images/team1.jpg" label="Schedules" />
      </main>
    </div>
  

  );
}

