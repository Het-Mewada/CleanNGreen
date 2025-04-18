import axios from "axios";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

const EventDetails = ({ eventsToShow = null }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());
  const [remainingTickets, setRemainingTickets] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${__API_URL__}/events`);
        const eventsData = eventsToShow ? response.data.slice(0, eventsToShow) : response.data;
        
        setEvents(eventsData);
        
        // Initialize remaining tickets for each event
        const ticketsInitialState = {};
        eventsData.forEach(event => {
          ticketsInitialState[event._id] = event.maxAttendees || 0;
        });
        setRemainingTickets(ticketsInitialState);
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [eventsToShow]);

  const handleBookmark = (eventId) => {
    setBookmarkedEvents(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(eventId)) {
        newBookmarks.delete(eventId);
      } else {
        newBookmarks.add(eventId);
      }
      return newBookmarks;
    });
  };

  const handleTicketPurchase = (eventId) => {
    setRemainingTickets(prev => {
      if (prev[eventId] > 0) {
        return {
          ...prev,
          [eventId]: prev[eventId] - 1
        };
      }
      return prev;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(eventsToShow || 3)].map((_, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-700/30 rounded-t-3xl"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-700/30 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-700/30 rounded-full w-full"></div>
                <div className="h-4 bg-gray-700/30 rounded-full w-5/6"></div>
                <div className="h-10 bg-gray-700/30 rounded-xl w-32 mt-6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Events Found</h2>
          <p className="text-white/80">Check back later for upcoming events!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {events.map((event) => (
      <div 
        key={event._id} 
        className="group relative isolate overflow-hidden rounded-2xl transition-all duration-700 hover:scale-[1.02]"
      >
        {/* **Glass Morphic Background Layer** */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl" />
        
        {/* **Hover Glow Effect** (Subtle but mesmerizing) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-violet-600/20 blur-xl rounded-2xl" />
        </div>

        {/* **Event Image with Parallax Tilt Effect** */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-purple-900 flex items-center justify-center">
              <svg className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {/* **Gradient Overlay** */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* **3D Floating Title** */}
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h2 className="text-2xl font-bold text-white drop-shadow-2xl">
              {event.title}
            </h2>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* **Holographic Info Panel (Tilt on Hover)** */}
        <div className="bg-white p-6 relative z-10">
          {/* **Dynamic Price Tag (Floating)** */}
          <div className="absolute -top-6 right-6">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold px-4 py-2 rounded-full shadow-lg">
              {event.ticketPrice > 0 ? `$${event.ticketPrice}` : 'FREE'}
            </div>
          </div>

          {/* **Organizer (Glass Badge)** */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold">
              {event.organizer?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-black/70 text-sm">Hosted by</p>
              <p className="text-dark font-medium">{event.organizer}</p>
            </div>
          </div>

          {/* **Location (Neon Pin Icon)** */}
          <div className="flex items-center gap-2 mb-4 text-dark-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>

          {/* **Description (Animated Expand on Hover)** */}
          <div className="mb-4">
            <p className="text-black text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {event.description}
            </p>
          </div>

          {/* **Interactive Elements** */}
          <div className="flex justify-between items-center">
            {/* **Tickets Left (Pulsing Animation)** */}
            {event.maxAttendees && (
              <div className="flex items-center gap-2">
                <div className="relative w-3 h-3">
                  <div className={`absolute inset-0 rounded-full ${remainingTickets[event._id] > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></div>
                </div>
                <span className="text-xs text-gray-600">
                {remainingTickets[event._id]} left of {event.maxAttendees} 
                </span>
              </div>
            )}

            {/* **"Get Tickets" (Holographic Button)** */}
            <button
              onClick={() => handleTicketPurchase(event._id)}
              disabled={remainingTickets[event._id] <= 0}
              className={`px-5 py-2 rounded-full font-medium text-white transition-all duration-300 ${
                remainingTickets[event._id] <= 0
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-violet-600 hover:shadow-lg hover:shadow-pink-500/30'
              }`}
            >
              {remainingTickets[event._id] <= 0 ? 'Sold Out' : 'Get Tickets'}
            </button>
          </div>
        </div>

        {/* **Featured Ribbon (3D Folded)** */}
        {event.isFeatured && (
          <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-500 to-amber-600 transform -rotate-45 origin-bottom-left -translate-x-1/2 -translate-y-1/2 shadow-md">
              <span className="absolute bottom-0 right-0 text-xs font-bold text-black px-2 py-1">FEATURED</span>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

export default EventDetails;