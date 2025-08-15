import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Search, Tag, XCircle, CheckCircle } from 'lucide-react';
import { useData } from '../../../contexts/DataContext';

export default function EventCalendar() {
  const { events } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]); // State to store IDs of registered events
  const [loadingEventId, setLoadingEventId] = useState(null);

  useEffect(() => {
    // Simulate loading registered events from local storage or an API
    const storedRegistrations = localStorage.getItem('eventRegistrations');
    if (storedRegistrations) {
      setRegisteredEvents(JSON.parse(storedRegistrations));
    }
  }, []);

  useEffect(() => {
    // Save registrations whenever the registeredEvents state changes
    localStorage.setItem('eventRegistrations', JSON.stringify(registeredEvents));
  }, [registeredEvents]);


  const eventTypes = ['all', 'workshop', 'seminar', 'competition', 'networking'];
  // Ensure departments are derived from actual events data to avoid 'undefined'
  const departments = ['all', ...new Set(events.map(e => e.department).filter(dept => dept))];


  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesDepartment = selectedDepartment === 'all' || event.department === selectedDepartment;

    return matchesSearch && matchesType && matchesDepartment;
  });

  const upcomingEvents = filteredEvents.filter(event => event.date >= new Date());
  const pastEvents = filteredEvents.filter(event => event.date < new Date());

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'seminar':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'competition':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'networking':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isEventFull = (event) => event.registered >= event.capacity;
  const isRegistered = (eventId) => registeredEvents.includes(eventId);

  const handleRegister = (eventId: string) => {
    setLoadingEventId(eventId);
    setTimeout(() => {
      setRegisteredEvents(prev => [...prev, eventId]);
      // Update the event's registered count (this would typically be an API call)
      // For simulation, we'll just update the local state representation if needed,
      // but the primary state is the registeredEvents array.
      setLoadingEventId(null);
      setShowRegistrationModal(false); // Close modal after registration
    }, 500); // Simulate network delay
  };

  const handleUnregister = (eventId: string) => {
    setLoadingEventId(eventId);
    setTimeout(() => {
      setRegisteredEvents(prev => prev.filter(id => id !== eventId));
      // Update the event's registered count (API call simulation)
      setLoadingEventId(null);
      setShowRegistrationModal(false); // Close modal after unregistration
    }, 500); // Simulate network delay
  };

  const openRegistrationModal = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };


  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${isPast ? 'opacity-75' : ''}`} onClick={() => !isPast && openRegistrationModal(event)}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                {event.type}
              </span>
              {event.department !== 'All Departments' && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {event.department}
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {event.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <div>
              <div className="font-medium">
                {event.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-sm">
                {event.date.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <div>
              <div className="font-medium">{event.location}</div>
              <div className="text-sm">Venue</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{event.registered}/{event.capacity}</span>
              <span className="text-sm ml-1">registered</span>
            </div>
            <div className="text-sm text-gray-500">
              by {event.organizer}
            </div>
          </div>

          {!isPast && (
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors" onClick={() => openRegistrationModal(event)}>
                Learn More
              </button>
              <button 
                className={`px-6 py-2 font-medium text-sm rounded-lg transition-colors ${
                  isEventFull(event)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isRegistered(event.id)
                    ? 'bg-gray-300 text-gray-600 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isEventFull(event) || isRegistered(event.id)}
                onClick={() => !isRegistered(event.id) && openRegistrationModal(event)}
              >
                {isRegistered(event.id) ? 'Registered' : isEventFull(event) ? 'Full' : 'Register'}
              </button>
            </div>
          )}

          {isPast && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campus Events</h1>
        <p className="text-gray-600 mt-1">Discover workshops, seminars, competitions, and networking opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
          <span className="text-sm text-gray-500">{upcomingEvents.length} events</span>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events found</h3>
            <p className="text-gray-600">Check back later for new events or adjust your search criteria</p>
          </div>
        )}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Past Events</h2>
            <span className="text-sm text-gray-500">{pastEvents.length} events</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastEvents.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))}
          </div>

          {pastEvents.length > 4 && (
            <div className="text-center mt-6">
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View More Past Events
              </button>
            </div>
          )}
        </div>
      )}

      {/* My Registrations Summary */}
      {registeredEvents.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Event Registrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{registeredEvents.length}</div>
              <div className="text-sm text-gray-600">Total Registered</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {registeredEvents.filter(id => upcomingEvents.some(e => e.id === id)).length}
              </div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {registeredEvents.filter(id => pastEvents.some(e => e.id === id)).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                <button 
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Event Info */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type}
                    </span>
                    {selectedEvent.department !== 'All Departments' && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {selectedEvent.department}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{selectedEvent.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">Date & Time</div>
                        <div className="text-gray-600">
                          {selectedEvent.date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-gray-600">
                          {selectedEvent.date.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">Location</div>
                        <div className="text-gray-600">{selectedEvent.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">Capacity</div>
                        <div className="text-gray-600">
                          {selectedEvent.registered}/{selectedEvent.capacity} registered
                        </div>
                        {isEventFull(selectedEvent) && (
                          <div className="text-red-600 text-sm font-medium">Event is full</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">Organizer</div>
                        <div className="text-gray-600">{selectedEvent.organizer}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Status */}
                {isRegistered(selectedEvent.id) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">You are registered for this event</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>

                  {isRegistered(selectedEvent.id) ? (
                    <button 
                      onClick={() => handleUnregister(selectedEvent.id)}
                      disabled={loadingEventId === selectedEvent.id}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loadingEventId === selectedEvent.id ? 'Canceling...' : 'Cancel Registration'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRegister(selectedEvent.id)}
                      disabled={isEventFull(selectedEvent) || loadingEventId === selectedEvent.id}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        isEventFull(selectedEvent)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : loadingEventId === selectedEvent.id
                          ? 'bg-blue-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {loadingEventId === selectedEvent.id ? 'Registering...' : 
                       isEventFull(selectedEvent) ? 'Event Full' : 'Register Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Load More */}
      {pastEvents.length > 4 && (
        <div className="text-center py-8">
          <button className="bg-white border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
            Load More Past Events
          </button>
        </div>
      )}
    </div>
  );
}