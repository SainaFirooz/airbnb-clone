import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import AdminClient from "./AdminClient";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You are not authorized to view this page."
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({});

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listings found"
          subtitle="There are no listings available to manage."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <AdminClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default AdminPage;
