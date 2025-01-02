import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/ui/Hero';
import { SearchForm } from './components/search/SearchForm';
import { SearchResults } from './components/search/SearchResults';
import { CaregiverProfile } from './components/caregiver/CaregiverProfile';
import { Stats } from './components/ui/Stats';
import { useState } from 'react';

function App() {
  const [searchParams, setSearchParams] = useState({});

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-12">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <SearchForm onSearch={setSearchParams} />
                  <SearchResults searchParams={searchParams} />
                  <Stats />
                </>
              }
            />
            <Route path="/caregiver/:id" element={<CaregiverProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;