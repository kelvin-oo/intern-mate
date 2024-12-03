"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "react-toastify";
import { uploadToS3 } from '@/lib/s3';
import { getS3Url } from '@/lib/s3';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { createApplication } from "@/actions/application";
import { useRouter } from 'next/navigation';
import { SubmissionModal } from '@/app/components/SubmissionModal';

export default function NewApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [emails, setEmails] = useState([]);
  const router = useRouter()
  const [currentEmail, setCurrentEmail] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const form = useForm({
    defaultValues: {
      companyName: '',
      position: '',
      location: '',
      applicationLink: '',
      deadline: '',
      description: '',
      requirements: '',
      status: 'OPEN', // Added this line
    },
  });

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (currentEmail && isValidEmail(currentEmail) && !emails.includes(currentEmail)) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail('');
    } else {
      toast.error("Invalid Email");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async function onSubmit(values) {
    const { companyName, position, location, applicationLink, deadline, description, requirements, status } = values;
    
    setIsSubmitting(true);
    if(!companyName) {
      setIsSubmitting(false);
      toast.error("Company name is required")
      return;
    }
    if(!position) {
      setIsSubmitting(false);
      toast.error("Position is required")
      return;
    }     
    // if(!applicationLink) {
    //   toast.error("Application link is required")
    //   return;
    // }
    // if(!deadline) {
    //   toast.error("Deadline is required")
    //   return;
    // }
    if(!description) {
      setIsSubmitting(false);
      toast.error("Description is required")
      return;
    }
    if(!location) {
      setIsSubmitting(false);
      toast.error("Location is required")
      return;
    }
    if(!status) {
      setIsSubmitting(false);
      toast.error("Status is required")
      return;
    }
    if(!emails.length) {
      setIsSubmitting(false);
      toast.error("At least one email is required")
      return;
    }

    let fileUrl = null;
    if (selectedFile) {
        const file = await uploadToS3(selectedFile)
      fileUrl = getS3Url(file.file_key)
    }
    try {
      const formData = {
        ...values,
        relevantEmails: emails,
        resourceUrl: fileUrl,
      };
      
      const result = await createApplication(formData);
      
      if (result.error) {
        setIsSubmitting(false);
        toast.error(result.error);
        return;
      }

      setShowSubmissionModal(true);
      
      form.reset();
      setEmails([]);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleCloseModal = () => {
    setShowSubmissionModal(false);
  };

  const handleViewApplications = () => {
    router.push("/applications");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/dashboard" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">New Application</h1>
          <p className="text-muted-foreground">
            Track a new internship application
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internship Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          Open
                        </div>
                      </SelectItem>
                      <SelectItem value="CLOSED">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          Closed
                        </div>
                      </SelectItem>
                      <SelectItem value="UPCOMING">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          Upcoming
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter position title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter application URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      placeholder="Select a deadline"
                      {...field}
                      min={new Date().toISOString().split('T')[0]}
                      className="[&::-webkit-datetime-edit-text]:text-gray-500 
                                [&::-webkit-datetime-edit]:text-gray-500 
                                [&::-webkit-datetime-edit-day-field]:text-gray-500 
                                [&::-webkit-datetime-edit-month-field]:text-gray-500 
                                [&::-webkit-datetime-edit-year-field]:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter job description"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter job requirements"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Add Relevant Emails</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={handleAddEmail}
                    variant="secondary"
                  >
                    Add
                  </Button>
                </div>
                
                {/* Email List */}
                {emails.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {emails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{email}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Add Relevant Resource</h3>
              <div className="flex flex-col items-center gap-4">
                <label 
                  htmlFor="file-upload" 
                  className="w-full cursor-pointer"
                >
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-primary transition-colors">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, PNG, JPG up to 10MB
                    </span>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />

                {selectedFile && (
                  <div className="w-full">
                    {previewUrl ? (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <Image
                          src={previewUrl}
                          alt="File preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground truncate">
                          {selectedFile.name}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Application'}
            </Button>
          </form>
        </Form>
      </Card>
      
      <SubmissionModal 
        isOpen={showSubmissionModal}
        onClose={handleCloseModal}
        onViewApplications={handleViewApplications}
      />
    </div>
  );
}
