import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Search, Tag } from 'lucide-react';
import { useData } from '../../../contexts/DataContext';

export default function EventCalendar() {
  const { events } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const eventTypes = ['all', 'workshop', 'seminar', 'competition', 'networking'];
  const departments = ['all', ...new Set(events.map(e => e.department))];

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

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${isPast ? 'opacity-75' : ''}`}>
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
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                Learn More
              </button>
              <button 
                className={`px-6 py-2 font-medium text-sm rounded-lg transition-colors ${
                  event.registered >= event.capacity
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={event.registered >= event.capacity}
              >
                {event.registered >= event.capacity ? 'Full' : 'Register'}
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
    </div>
  );
}