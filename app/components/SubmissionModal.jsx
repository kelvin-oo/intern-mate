import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function SubmissionModal({ isOpen, onClose, onViewApplications }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thank you for contributing!</DialogTitle>
          <DialogDescription>
            Your internship opportunity has been submitted to InternMate. We'll review your submission
            and notify you via email once it's approved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="secondary" onClick={onClose}>
            Submit Another
          </Button>
          <Button onClick={onViewApplications}>
            View My Applications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 