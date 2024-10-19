import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiService } from "@/lib/apiService"

export default function RentalLogsSection() {
  const [rentalLogs, setRentalLogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRentalLogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm])

  const fetchRentalLogs = async () => {
    try {
      const response = await apiService.getRentalLogs(page, searchTerm)
      setRentalLogs(response.rentalLogs)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Failed to fetch rental logs:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rental Logs</h2>
        <Input
          type="search"
          placeholder="Search rental logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentalLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.id}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.vehicle}</TableCell>
              <TableCell>{log.startDate}</TableCell>
              <TableCell>{log.endDate}</TableCell>
              <TableCell>{log.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}
