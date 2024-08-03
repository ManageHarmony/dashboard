
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
 
  
  const topConsultantsData = [
    { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
    { id: 2, name: "Kanika Jindal", times: 35 },
    { id: 3, name: "Shubham Solanki", times: 31 },
    { id: 4, name: "Mikakshi Sisodia", times: 28 },
    { id: 5, name: "Rishi Kumar", times: 18 },
  ];
  
  export default function TopConsultants() {
    return (
    
        <Card className="top-sessions">
        <CardHeader className="cardHeader">
          <CardTitle>
            <span className="font-bold text-lg">Top 5 Consultants Picks</span>{" "}
            <span className="font-normal text-lg">by Users</span>
          </CardTitle>
          <a
            href="#see-all"
            className="text-sm text-orange-600 flex items-center"
          >
            See All{" "}
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </a>
        </CardHeader>
        <CardContent>
          <Table>
            {/* <TableCaption>Top 5 Consultants Picks by Users</TableCaption> */}
            <TableHeader>
              <TableRow className="bg-orange-100">
                <TableHead className="text-left">Sr. No</TableHead>
                <TableHead className="text-left">Therapist Name</TableHead>
                <TableHead className="text-left">Times</TableHead>
                <TableHead className="text-left">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topConsultantsData.map((consultant, index) => (
                <TableRow key={consultant.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{consultant.name}</TableCell>
                  <TableCell>{consultant.times}</TableCell>
                  <TableCell>
                    <button className="text-orange-600 flex items-center">
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12h3m-3-4h3m-3 8h3m-3-4a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  