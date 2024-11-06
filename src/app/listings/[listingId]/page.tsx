import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import ListingClient from "../ListingClient";
import getReservations from "../../actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async (props: { params: Promise<IParams> }) => {
  const params = await props.params;
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
