"use client";
import { useEffect, useState } from "react";
import { Event } from "./models/event";
import { EventCard } from "./components/EventCard";
import { SearchBar } from "./components/SearchBar";
import { formatEventDate } from "./utils/formatDate";
import { Navbar } from "./components/Navbar";
import { getPlatformEvents } from "./api/platform-event";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await getPlatformEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const today = new Date();

  const filteredEvents = events
    .filter((event) => new Date(event.eventDateAndTime) >= today)
    .filter(
      (event) =>
        event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatEventDate(event.eventDateAndTime)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .sort(
      (a, b) =>
        new Date(a.eventDateAndTime).getTime() -
        new Date(b.eventDateAndTime).getTime(),
    );

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="bg-cas-green flex flex-col justify-center text-center w-full text-cas-white p-12 shadow-cas-black/20 shadow-md">
        <h1 className="mb-4">Próximos Eventos</h1>
        <p>
          Descubre eventos próximos: conferencias, talleres y más. ¡Asegura tu
          lugar hoy mismo!
        </p>
      </div>
      <div className="px-4 py-10 sm:py-10 sm:px-10 md:px-20 xl:px-32 4xl:px-48">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {loading ? (
          <svg
            className="animate-spin text-cas-green w-20 h-20 mx-auto text-center mt-20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : filteredEvents.length > 0 ? (
          <div className="grid place-content-center justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-8 pb-20">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.eventTitle}
                date={event.eventDateAndTime}
                imageSrc={event.imageUrl}
                eventId={event.idEvent}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-cas-gray-mid">
            No se han encontrado eventos.
          </p>
        )}
      </div>
    </main>
  );
}
