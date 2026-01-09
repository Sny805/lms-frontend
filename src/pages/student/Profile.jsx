import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Course } from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

export const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [open, setOpen] = useState(false);

  const { data: userData, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { isLoading: isUpdating, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  const data = userData?.data;

  // Prefill name when dialog opens
  useEffect(() => {
    if (open && data?.fullName) {
      setName(data.fullName);
    }
  }, [open, data]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    if (!name && !profilePhoto) return;

    const formData = new FormData();
    if (name) formData.append("fullName", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      refetch();
      setOpen(false);
      setProfilePhoto(null);
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return (
      <div className="py-32 text-center text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto my-24 px-4">
      <h1 className="font-extrabold text-2xl mb-8 text-gray-900 dark:text-gray-100">
        Profile
      </h1>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-28 w-28 md:h-32 md:w-32">
          <AvatarImage
            src={data?.photoUrl || "https://github.com/shadcn.png"}
            alt={data?.fullName}
          />
          <AvatarFallback>
            {data?.fullName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 text-center md:text-left">
          <p className="text-gray-900 dark:text-gray-100 font-semibold">
            Name:{" "}
            <span className="font-normal text-gray-700 dark:text-gray-300">
              {data?.fullName}
            </span>
          </p>

          <p className="text-gray-900 dark:text-gray-100 font-semibold">
            Email:{" "}
            <span className="font-normal text-gray-700 dark:text-gray-300">
              {data?.email}
            </span>
          </p>

          <p className="text-gray-900 dark:text-gray-100 font-semibold">
            Role:{" "}
            <span className="font-normal text-gray-700 dark:text-gray-300 uppercase">
              {data?.role}
            </span>
          </p>

          {/* Edit Profile Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3">
                Edit Profile
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your personal information.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button disabled={isUpdating} onClick={updateUserHandler}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
          Courses you're enrolled in
        </h2>

        {data?.enrolledCourses?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.enrolledCourses?.map((course) => (
              <Course course={course} key={course._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
