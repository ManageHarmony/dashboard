import Link from "next/link";
import { Button } from "react-bootstrap";


export default function Home() {
  return (
    <>
      <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{ width: "80%",display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <Link href='/admin'><Button>Go to Admin Page</Button></Link>
          <Link href='/manager'><Button>Go to manager Page</Button></Link>
          <Link href='/creator'><Button>Go to creator Page</Button></Link>
        </div>
      </div>
    </>
  );
}
