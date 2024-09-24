
'use client';

import { Loader2 } from "lucide-react";
import { Button as BootstrapButton } from "react-bootstrap";

export default function ButtonLoading() {
  return (
    <BootstrapButton disabled style={{ backgroundColor: '#fff', border: "1px dashed orange", width: "auto", color: "#ff6600", display: "flex", alignItems: "center" }}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <span>Please wait...</span>
    </BootstrapButton>
  );
}
