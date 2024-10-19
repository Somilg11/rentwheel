"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Eye, Send } from "lucide-react"
import { apiService } from "@/lib/apiService"

export default function ContactInquiriesSection() {
  const [inquiries, setInquiries] = useState([])
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [currentInquiry, setCurrentInquiry] = useState(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchInquiries()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm])

  const fetchInquiries = async () => {
    try {
      const response = await apiService.getContactInquiries(page, searchTerm)
      setInquiries(response.inquiries)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Failed to fetch contact inquiries:", error)
    }
  }

  const handleViewInquiry = (inquiry) => {
    setCurrentInquiry(inquiry)
    setIsViewDialogOpen(true)
  }

  const handleReplyInquiry = (inquiry) => {
    setCurrentInquiry(inquiry)
    setIsReplyDialogOpen(true)
  }

  const handleSendReply = async () => {
    if (!currentInquiry) return
    try {
      await apiService.replyToInquiry(currentInquiry.id, replyMessage)
      setIsReplyDialogOpen(false)
      setReplyMessage("")
      fetchInquiries()
    } catch (error) {
      console.error("Failed to send reply:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Contact Inquiries</h2>
        <Input
          type="search"
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.id}</TableCell>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>{inquiry.email}</TableCell>
              <TableCell>{inquiry.subject}</TableCell>
              <TableCell>{inquiry.status}</TableCell>
              <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" onClick={() => handleViewInquiry(inquiry)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => handleReplyInquiry(inquiry)}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
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

      {/* View Inquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Inquiry</DialogTitle>
          </DialogHeader>
          {currentInquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <div className="col-span-3">{currentInquiry.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email</Label>
                <div className="col-span-3">{currentInquiry.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Subject</Label>
                <div className="col-span-3">{currentInquiry.subject}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Message</Label>
                <div className="col-span-3">{currentInquiry.message}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">{currentInquiry.status}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Date</Label>
                <div className="col-span-3">{new Date(currentInquiry.createdAt).toLocaleString()}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply to Inquiry Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Inquiry</DialogTitle>
            <DialogDescription>Compose your reply to the inquiry.</DialogDescription>
          </DialogHeader>
          {currentInquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">To</Label>
                <div className="col-span-3">{currentInquiry.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Subject</Label>
                <div className="col-span-3">Re: {currentInquiry.subject}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reply-message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="reply-message"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSendReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
