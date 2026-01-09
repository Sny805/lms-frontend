import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ByCourseButton = ({ courseId }) => {

  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();
  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId)
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        console.log("url", data.url)
        window.location.href = data.url // Redirect ot stripe url
      }
      else {
        toast.error("Invalid Response from server")
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session")
    }
  }, [isError, isSuccess])



  return (
    <Button className="w-full" onClick={purchaseCourseHandler} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  )
}

export default ByCourseButton