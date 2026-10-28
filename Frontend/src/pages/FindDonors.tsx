import { useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const donors = [
  { id: 1, name: 'Marcus Rivera', blood: 'O-', city: 'New York', lastDonated: 'Sept 1, 2026', available: true, donations: 14, avatar: 'MR', color: '#FF0040' },
  { id: 2, name: 'Priya Sharma', blood: 'AB+', city: 'Boston', lastDonated: 'Aug 15, 2026', available: true, donations: 8, avatar: 'PS', color: '#7B2FFF' },
  { id: 3, name: 'James Okafor', blood: 'B+', city: 'Chicago', lastDonated: 'July 30, 2026', available: false, donations: 22, avatar: 'JO', color: '#00B4FF' },
  { id: 4, name: 'Elena Vasquez', blood: 'A+', city: 'New York', lastDonated: 'Aug 28, 2026', available: true, donations: 5, avatar: 'EV', color: '#00E5A0' },
  { id: 5, name: 'David Kim', blood: 'O+', city: 'Seattle', lastDonated: 'Sept 5, 2026', available: true, donations: 11, avatar: 'DK', color: '#FF7B00' },
  { id: 6, name: 'Fatima Al-Hassan', blood: 'A-', city: 'Houston', lastDonated: 'Aug 10, 2026', available: false, donations: 17, avatar: 'FA', color: '#FF0040' },
  { id: 7, name: 'Luca Bianchi', blood: 'B-', city: 'Los Angeles', lastDonated: 'Sept 8, 2026', available: true, donations: 3, avatar: 'LB', color: '#7B2FFF' },
  { id: 8, name: 'Ana Pérez', blood: 'AB-', city: 'Miami', lastDonated: 'Aug 22, 2026', available: true, donations: 9, avatar: 'AP', color: '#00B4FF' },
];

export default function FindDonors() {
  const [search, setSearch] = useState('');
  const [filterBlood, setFilterBlood] = useState('All');
  const [filterCity, setFilterCity] = useState('');
  const [showModal, setShowModal] = useState<number | null>(null);
  const [requested, setRequested] = useState<number[]>([]);

  const filtered = donors.filter(d => {
    const matchBlood = filterBlood === 'All' || d.blood === filterBlood;
    const matchCity = !filterCity || d.city.toLowerCase().includes(filterCity.toLowerCase());
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
    return matchBlood && matchCity && matchSearch;
  });

  const handleRequest = (id: number) => { setRequested(prev => [...prev, id]); setShowModal(null); };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header banner */}
      <div className="bg-[#00032B] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#FF0040]/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-xs font-mono-label text-white/35 mb-4">
            <Link to="/" className="hover:text-[#FF0040] transition-colors">Home</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/60">Find Donors</span>
          </nav>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-2">Network</p>
              <h1 className="font-display text-4xl font-black text-white">Find Blood Donors</h1>
              <p className="text-white/45 mt-2">Search {donors.length} verified donors across the network.</p>
            </div>
            <div className="flex gap-3 text-center">
              <div className="bg-white/6 border border-white/10 rounded-2xl px-5 py-3">
                <p className="font-display text-2xl font-black text-white">{donors.filter(d => d.available).length}</p>
                <p className="text-xs text-white/40 font-mono-label">Available now</p>
              </div>
              <div className="bg-white/6 border border-white/10 rounded-2xl px-5 py-3">
                <p className="font-display text-2xl font-black text-white">{donors.reduce((s, d) => s + d.donations, 0)}</p>
                <p className="text-xs text-white/40 font-mono-label">Total donations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-5 mb-8 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px] relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-mono-label text-sm">◍</span>
                <input type="text" placeholder="Search donors by name..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full border-2 border-[var(--border)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
              </div>
              <div className="flex flex-wrap gap-2">
                {bloodTypes.map(bt => (
                  <button key={bt} onClick={() => setFilterBlood(bt)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      filterBlood === bt ? 'bg-[#FF0040] border-[#FF0040] text-white glow-red-sm' : 'border-[var(--border)] text-[#00032B] hover:border-[#00032B]'
                    }`}>{bt}</button>
                ))}
              </div>
              <input type="text" placeholder="City..." value={filterCity} onChange={e => setFilterCity(e.target.value)}
                className="border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors min-w-[140px]" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-mono-label text-[var(--muted-foreground)]">{filtered.length} DONORS FOUND</p>
            {(search || filterCity || filterBlood !== 'All') && (
              <button onClick={() => { setSearch(''); setFilterBlood('All'); setFilterCity(''); }}
                className="text-xs text-[#FF0040] font-semibold hover:text-[#cc0033]">Clear filters ×</button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(donor => (
              <div key={donor.id} className="bg-white rounded-2xl border-2 border-[var(--border)] overflow-hidden hover:border-[#00032B] hover:shadow-lg transition-all group">
                {/* Card top */}
                <div className="relative h-20 flex items-end px-5 pb-4" style={{ background: `linear-gradient(135deg, ${donor.color}20, ${donor.color}08)` }}>
                  <div className="absolute top-4 right-5 font-display font-black text-3xl" style={{ color: `${donor.color}30` }}>{donor.blood}</div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm relative z-10 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${donor.color}, ${donor.color}bb)` }}>
                    {donor.avatar}
                  </div>
                </div>

                <div className="px-5 pt-3 pb-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-display font-bold text-[#00032B] text-base">{donor.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{donor.city}</p>
                    </div>
                    <span className="font-display font-black text-lg" style={{ color: donor.color }}>{donor.blood}</span>
                  </div>

                  <div className="flex gap-3 text-xs text-[var(--muted-foreground)] my-3 font-mono-label">
                    <span>{donor.donations} donations</span>
                    <span className="text-[var(--border)]">·</span>
                    <span>{donor.lastDonated}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${donor.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {donor.available ? '● Available' : '○ Unavailable'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/donors/${donor.id}`} className="flex-1 text-center text-xs border-2 border-[var(--border)] py-2 rounded-xl font-semibold hover:border-[#00032B] hover:text-[#00032B] transition-colors">
                      Profile
                    </Link>
                    {donor.available && (
                      requested.includes(donor.id) ? (
                        <span className="flex-1 text-center text-xs bg-green-100 text-green-700 py-2 rounded-xl font-semibold">Sent ✓</span>
                      ) : (
                        <button onClick={() => setShowModal(donor.id)}
                          className="flex-1 text-center text-xs text-white py-2 rounded-xl font-semibold transition-all"
                          style={{ background: donor.color }}>
                          Request
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal !== null && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-md w-full shadow-2xl border border-[var(--border)]">
            <div className="w-12 h-12 rounded-2xl bg-[#FF0040]/10 flex items-center justify-center text-[#FF0040] font-mono-label text-xl mb-5">◆</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-1">Send Donation Request</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-5">
              Requesting <strong className="text-[#00032B]">{donors.find(d => d.id === showModal)?.name}</strong> — add a note about your need:
            </p>
            <textarea className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] resize-none h-24 transition-colors"
              placeholder="Blood type needed, hospital name, urgency level, any additional context..." />
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(null)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">Cancel</button>
              <button onClick={() => handleRequest(showModal!)} className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#cc0033] transition-colors glow-red-sm">Send Request</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
