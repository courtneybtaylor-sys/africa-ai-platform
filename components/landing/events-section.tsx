"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// 2026 African Festivals Calendar Data
const festivals = [
  // January
  { name: "Voodoo Festival", location: "Ouidah, Benin", country: "BJ", date: "Jan 6-11", month: 1, type: "Cultural" },
  { name: "Ankos Festival", location: "Takoradi, Ghana", country: "GH", date: "January", month: 1, type: "Music" },
  { name: "Cape Town Minstrel Carnival", location: "Cape Town, South Africa", country: "ZA", date: "Jan 5", month: 1, type: "Parade" },
  { name: "Wolfkop Weekender", location: "Citrusdal, South Africa", country: "ZA", date: "Jan 15-19", month: 1, type: "Music" },
  { name: "Delheim Harvest Festival", location: "Stellenbosch, South Africa", country: "ZA", date: "Jan 30 - Feb 1", month: 1, type: "Food & Wine" },
  
  // February
  { name: "Up the Creek Music Festival", location: "Swellendam, South Africa", country: "ZA", date: "Feb 5-8", month: 2, type: "Music" },
  { name: "Calabash South Africa", location: "Johannesburg & Cape Town", country: "ZA", date: "Feb 7 & 11", month: 2, type: "Music" },
  { name: "Black Coffee Weekender", location: "Cape Town, South Africa", country: "ZA", date: "Feb 27 - Mar 1", month: 2, type: "Music" },
  
  // March
  { name: "Bazique Festival", location: "Tulbagh, South Africa", country: "ZA", date: "Mar 6-8", month: 3, type: "Music" },
  { name: "Akwasidae Festival", location: "Kumasi, Ghana", country: "GH", date: "Mar 3", month: 3, type: "Traditional" },
  { name: "Cape Town International Jazz Festival", location: "Cape Town, South Africa", country: "ZA", date: "Mar 27-28", month: 3, type: "Jazz" },
  { name: "Cape Town Carnival", location: "Cape Town, South Africa", country: "ZA", date: "Mar 21", month: 3, type: "Parade" },
  { name: "KKNK Arts Festival", location: "Oudtshoorn, South Africa", country: "ZA", date: "Mar 28 - Apr 4", month: 3, type: "Arts" },
  
  // April
  { name: "Splashy Fen Music Festival", location: "Drakensberg, South Africa", country: "ZA", date: "Apr 2-6", month: 4, type: "Music" },
  { name: "Pink Loerie Arts Festival", location: "Knysna, South Africa", country: "ZA", date: "Apr 30 - May 3", month: 4, type: "Arts" },
  { name: "Ultra South Africa", location: "Johannesburg & Cape Town", country: "ZA", date: "Apr 25-26", month: 4, type: "Electronic" },
  { name: "AfrikaBurn", location: "Tankwa Karoo, South Africa", country: "ZA", date: "Apr 27 - May 3", month: 4, type: "Arts" },
  
  // May
  { name: "Saint Louis Jazz Festival", location: "Saint-Louis, Senegal", country: "SN", date: "May 12-19", month: 5, type: "Jazz" },
  { name: "Misty Waters", location: "Secunda, South Africa", country: "ZA", date: "May 1-3", month: 5, type: "Music" },
  
  // June-July
  { name: "National Arts Festival", location: "Makhanda, South Africa", country: "ZA", date: "Jun 25 - Jul 5", month: 6, type: "Arts" },
  { name: "Innibos Arts Festival", location: "Nelspruit, South Africa", country: "ZA", date: "Jul 2-5", month: 7, type: "Arts" },
  { name: "Knysna Oyster Festival", location: "Knysna, South Africa", country: "ZA", date: "Jul 3-12", month: 7, type: "Food" },
  { name: "Jazzablanca", location: "Casablanca, Morocco", country: "MA", date: "Jul 2-11", month: 7, type: "Jazz" },
  
  // August-December
  { name: "Yam Festival", location: "Various, Benin", country: "BJ", date: "Aug 10", month: 8, type: "Cultural" },
  { name: "Chale Wote Street Art Festival", location: "Accra, Ghana", country: "GH", date: "August", month: 8, type: "Arts" },
  { name: "Homowo Festival", location: "Accra, Ghana", country: "GH", date: "August", month: 8, type: "Traditional" },
  { name: "Oguaa Fetu Afahye", location: "Cape Coast, Ghana", country: "GH", date: "September", month: 9, type: "Traditional" },
  { name: "Gerewol Festival", location: "Abalak, Niger", country: "NE", date: "September", month: 9, type: "Cultural" },
  { name: "Rocking the Daisies", location: "Cloof Wine Estate, South Africa", country: "ZA", date: "Oct 2-4", month: 10, type: "Music" },
  { name: "Abu Simbel Sun Festival", location: "Abu Simbel, Egypt", country: "EG", date: "Oct 22", month: 10, type: "Cultural" },
  { name: "AfroFuture Fest", location: "Accra, Ghana", country: "GH", date: "December", month: 12, type: "Music" },
  { name: "Calabar Carnival", location: "Calabar, Nigeria", country: "NG", date: "December", month: 12, type: "Parade" },
];

const typeColors: Record<string, string> = {
  Cultural: "bg-purple-100 text-purple-800",
  Music: "bg-pink-100 text-pink-800",
  Parade: "bg-orange-100 text-orange-800",
  "Food & Wine": "bg-amber-100 text-amber-800",
  Traditional: "bg-emerald-100 text-emerald-800",
  Jazz: "bg-blue-100 text-blue-800",
  Arts: "bg-indigo-100 text-indigo-800",
  Electronic: "bg-cyan-100 text-cyan-800",
  Food: "bg-yellow-100 text-yellow-800",
};

const months = [
  "All", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function EventsSection() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [page, setPage] = useState(0);
  const eventsPerPage = 6;

  const filteredFestivals = selectedMonth === 0
    ? festivals
    : festivals.filter(f => f.month === selectedMonth);

  const totalPages = Math.ceil(filteredFestivals.length / eventsPerPage);
  const displayedFestivals = filteredFestivals.slice(page * eventsPerPage, (page + 1) * eventsPerPage);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-safari-gold text-safari-gold">
            2026 Calendar
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming African Festivals & Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the vibrant culture, music, and traditions of Africa through these incredible festivals
          </p>
        </div>

        {/* Month Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {months.map((month, index) => (
            <Button
              key={month}
              variant={selectedMonth === index ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedMonth(index); setPage(0); }}
              className={selectedMonth === index 
                ? "bg-safari-gold hover:bg-safari-gold/90 text-ebony" 
                : "bg-transparent"}
            >
              {month}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedFestivals.map((festival, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-safari-gold/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={typeColors[festival.type] || "bg-gray-100 text-gray-800"}>
                    {festival.type}
                  </Badge>
                  <span className="text-2xl">
                    {festival.country === "ZA" && "🇿🇦"}
                    {festival.country === "GH" && "🇬🇭"}
                    {festival.country === "BJ" && "🇧🇯"}
                    {festival.country === "SN" && "🇸🇳"}
                    {festival.country === "MA" && "🇲🇦"}
                    {festival.country === "NE" && "🇳🇪"}
                    {festival.country === "EG" && "🇪🇬"}
                    {festival.country === "NG" && "🇳🇬"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-safari-gold transition-colors">
                  {festival.name}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-safari-gold" />
                    <span>{festival.date}, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-kente-red" />
                    <span>{festival.location}</span>
                  </div>
                </div>
                <Link 
                  href={`/country/${festival.country.toLowerCase()}`}
                  className="mt-4 inline-flex items-center text-sm text-safari-gold hover:underline"
                >
                  Explore destination
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Planning to attend a festival? Let our AI help you plan the perfect trip.
          </p>
          <Button asChild className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
            <Link href="/planner">
              Plan Your Festival Trip
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
