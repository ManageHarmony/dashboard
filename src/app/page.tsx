'use client'

import Link from "next/link";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
export const KEY = process.env.API_KEY;


export default function Home() {

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{ width: "80%",display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <Link href='/admin'><Button>{ loading ? <Spinner /> :'Go to Admin Page'}</Button></Link>
          <Link href='/manager'><Button>{ loading ? <Spinner /> :'Go to manager Page'}</Button></Link>
          <Link href='/creator'><Button>{ loading ? <Spinner /> :'Go to creator Page'}</Button></Link>
        </div>
      </div>
    </>
  );
}
