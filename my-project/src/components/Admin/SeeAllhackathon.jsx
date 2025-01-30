import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const HackathonTable = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getAllHackthon');
        if (!response.ok) {
          throw new Error('Failed to fetch hackathon data');
        }
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error('Error fetching hackathon data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const showHackDetails=(id)=>{
    navigate(`/showoneHackathon/${id}`);
  }

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = hackathons.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="bg-white rounded shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Hackathon List</h2>
          <Table className="w-full table-auto border-collapse">
              <TableRow className="bg-gray-200">
                <TableCell className="font-bold text-black">Hackathon Name</TableCell>
                <TableCell className="font-bold text-black">Start Date</TableCell>
                <TableCell className="font-bold text-black">Start Time</TableCell>
                <TableCell className="font-bold text-black">Registered Teams</TableCell>
                <TableCell className="font-bold text-black">Actions</TableCell>
              </TableRow>
            
            <TableBody>
              {currentRows.map((hackathon) => (
                <TableRow key={hackathon._id} className="hover:bg-gray-50">
                  <TableCell className="text-black">{hackathon.name}</TableCell>
                  <TableCell className="text-black">{new Date(hackathon.startDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-black">{hackathon.startTime}</TableCell>
                  <TableCell className="text-black">{hackathon.teamCount || hackathon.registeredTeams.length}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => showHackDetails(hackathon._id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
  {/* Pagination Component with Black Styling */}
  <Pagination className="mt-6 text-black">
            <PaginationContent className="bg-black text-white">
              <PaginationItem>
                <PaginationPrevious
                  className="text-white hover:bg-gray-700"
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: Math.ceil(hackathons.length / rowsPerPage) }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    className={`text-white hover:bg-gray-700 ${currentPage === i + 1 ? 'bg-gray-800' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis className="text-white" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="text-white hover:bg-gray-700"
                  onClick={() => currentPage < Math.ceil(hackathons.length / rowsPerPage) && paginate(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default HackathonTable;