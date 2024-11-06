// components/AdminClient.tsx

"use client";

import { SafeListing, SafeUser } from "../types";
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";

interface AdminClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const AdminClient: React.FC<AdminClientProps> = ({ listings, currentUser }) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const handleDelete = useCallback((listingsId: string) => {
    setDeletingId(listingsId);

    axios
      .delete(`/api/listings/${listingsId}`)
      .then(() => {
        toast.success("Listing deleted successfully");
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to delete listing");
      })
      .finally(() => {
        setDeletingId("");
      });
  }, []);

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={() => handleDelete(listing.id)}
            actionLabel="Delete Listing"
            disabled={deletingId === listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default AdminClient;
