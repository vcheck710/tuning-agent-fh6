"use client";

import { useState, useMemo, useEffect } from "react";

// Custom hook that returns true if viewport is mobile (< 768px). Re-evaluates on resize.
// Returns false on the server (SSR) so desktop layout is the default until hydration.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const FH6_CARS = {
  "AMG Transport Dynamics": [
    {m:"M12S Warthog CST",y:2554,pi:663,c:"A",sp:4.2,ha:3.7,ac:9.1,la:10.0,br:6.7,of:10.0,r:"LEGENDARY",v:850000,co:"United States"},
  ],
  "Abarth": [
    {m:"695 Biposto",y:2016,pi:540,c:"B",sp:4.9,ha:5.3,ac:4.7,la:3.9,br:4.8,of:5.1,r:"COMMON",v:250000,co:"Italy"},
    {m:"Fiat 131",y:1980,pi:399,c:"D",sp:4.3,ha:4.1,ac:4.1,la:3.9,br:3.2,of:5.9,r:"COMMON",v:125000,co:"Italy"},
    {m:"595 esseesse",y:1968,pi:100,c:"D",sp:2.6,ha:3.7,ac:1.7,la:2.6,br:2.0,of:5.2,r:"COMMON",v:25000,co:"Italy"},
  ],
  "Acura": [
    {m:"Integra A-Spec",y:2023,pi:484,c:"C",sp:5.7,ha:4.7,ac:4.2,la:4.2,br:3.7,of:5.5,r:"RARE",v:36000,co:"United States"},
    {m:"NSX Type S",y:2022,pi:734,c:"S1",sp:7.3,ha:6.2,ac:8.7,la:7.7,br:6.9,of:5.4,r:"EPIC",v:193000,co:"United States"},
    {m:"RSX Type S",y:2002,pi:462,c:"C",sp:5.6,ha:4.7,ac:3.9,la:3.0,br:3.5,of:5.6,r:"COMMON",v:18000,co:"United States"},
    {m:"Integra Type R",y:2001,pi:471,c:"C",sp:5.6,ha:4.6,ac:3.9,la:3.1,br:3.4,of:5.4,r:"COMMON",v:25000,co:"United States"},
  ],
  "Alfa Romeo": [
    {m:"Giulia Quadrifoglio",y:2017,pi:667,c:"A",sp:7.3,ha:6.4,ac:5.9,la:4.9,br:6.7,of:5.0,r:"RARE",v:45000,co:"Italy"},
    {m:"4C",y:2014,pi:644,c:"A",sp:5.9,ha:5.7,ac:4.8,la:7.0,br:5.2,of:5.0,r:"EPIC",v:73000,co:"Italy"},
    {m:"8C Competizione",y:2007,pi:635,c:"A",sp:7.0,ha:5.3,ac:5.4,la:5.5,br:4.9,of:5.2,r:"EPIC",v:312000,co:"Italy"},
    {m:"155 Q4",y:1992,pi:439,c:"C",sp:4.8,ha:4.6,ac:3.9,la:4.2,br:3.3,of:5.7,r:"EPIC",v:30000,co:"Italy"},
    {m:"33 Stradale",y:1968,pi:593,c:"B",sp:6.2,ha:4.4,ac:5.7,la:4.4,br:3.6,of:5.0,r:"LEGENDARY",v:3500000,co:"Italy"},
    {m:"Giulia Sprint GTA Stradale",y:1965,pi:379,c:"D",sp:4.0,ha:3.7,ac:3.7,la:3.2,br:2.8,of:5.3,r:"RARE",v:343000,co:"Italy"},
    {m:"Giulia TZ2",y:1965,pi:532,c:"B",sp:5.5,ha:3.8,ac:4.3,la:4.4,br:3.4,of:5.1,r:"LEGENDARY",v:1200000,co:"Italy"},
  ],
  "Alumicraft": [
    {m:"#6165 Trick Truck",y:2022,pi:485,c:"C",sp:4.4,ha:3.0,ac:3.6,la:2.6,br:5.0,of:9.3,r:"EPIC",v:300000,co:"United States"},
    {m:"#122 Class 1 Buggy",y:2021,pi:571,c:"B",sp:4.9,ha:2.9,ac:6.4,la:5.3,br:5.3,of:9.1,r:"EPIC",v:160000,co:"United States"},
    {m:"Class 10 Race Car",y:2015,pi:532,c:"B",sp:4.4,ha:3.8,ac:5.0,la:4.1,br:4.8,of:9.9,r:"EPIC",v:45000,co:"United States"},
  ],
  "Apollo": [
    {m:"Intensa Emozione",y:2019,pi:916,c:"R",sp:7.4,ha:9.1,ac:7.7,la:8.4,br:10.0,of:4.4,r:"LEGENDARY",v:3200000,co:"Germany"},
  ],
  "Ariel": [
    {m:"Nomad",y:2016,pi:601,c:"A",sp:5.1,ha:4.5,ac:6.5,la:7.2,br:4.2,of:8.3,r:"RARE",v:54000,co:"United Kingdom"},
    {m:"Atom 500 V8",y:2013,pi:825,c:"S2",sp:6.3,ha:7.7,ac:7.8,la:8.5,br:6.9,of:4.5,r:"EPIC",v:190000,co:"United Kingdom"},
  ],
  "Aston Martin": [
    {m:"Valkyrie",y:2023,pi:925,c:"R",sp:9.2,ha:8.8,ac:7.4,la:8.0,br:10.0,of:4.7,r:"LEGENDARY",v:2750000,co:"United Kingdom"},
    {m:"Valkyrie AMR Pro",y:2022,pi:989,c:"R",sp:7.9,ha:9.4,ac:8.0,la:8.6,br:10.0,of:4.7,r:"LEGENDARY",v:4200000,co:"United Kingdom"},
    {m:"DBX",y:2021,pi:618,c:"A",sp:6.5,ha:4.8,ac:5.9,la:6.1,br:5.2,of:6.8,r:"RARE",v:250000,co:"United Kingdom"},
    {m:"DBS Superleggera",y:2019,pi:736,c:"S1",sp:7.8,ha:5.9,ac:5.8,la:6.2,br:6.9,of:5.0,r:"EPIC",v:275000,co:"United Kingdom"},
    {m:"Valhalla Concept Car",y:2019,pi:960,c:"R",sp:8.5,ha:9.2,ac:10.0,la:10.0,br:10.0,of:4.9,r:"LEGENDARY",v:1150000,co:"United Kingdom"},
    {m:"Vantage",y:2019,pi:696,c:"A",sp:7.0,ha:6.1,ac:6.0,la:6.4,br:6.1,of:5.0,r:"EPIC",v:250000,co:"United Kingdom"},
    {m:"DB11",y:2017,pi:679,c:"A",sp:7.3,ha:5.8,ac:5.7,la:6.1,br:6.1,of:5.3,r:"EPIC",v:175000,co:"United Kingdom"},
    {m:"Vulcan AMR Pro",y:2017,pi:898,c:"S2",sp:7.7,ha:8.8,ac:6.6,la:7.0,br:10.0,of:3.7,r:"LEGENDARY",v:3000000,co:"United Kingdom"},
    {m:"Vulcan",y:2016,pi:884,c:"S2",sp:8.2,ha:8.9,ac:6.6,la:7.0,br:10.0,of:4.2,r:"LEGENDARY",v:2300000,co:"United Kingdom"},
    {m:"DB5",y:1964,pi:417,c:"C",sp:5.1,ha:3.8,ac:4.0,la:2.9,br:2.7,of:5.7,r:"EPIC",v:500000,co:"United Kingdom"},
  ],
  "Audi": [
    {m:"RS 6 Avant",y:2021,pi:650,c:"A",sp:7.2,ha:5.7,ac:7.3,la:8.9,br:4.9,of:5.6,r:"RARE",v:83000,co:"Germany"},
    {m:"RS 7 Sportback",y:2021,pi:655,c:"A",sp:7.4,ha:5.7,ac:7.3,la:8.9,br:4.9,of:5.7,r:"RARE",v:80000,co:"Germany"},
    {m:"RS e-tron GT",y:2021,pi:677,c:"A",sp:6.0,ha:5.1,ac:8.4,la:9.4,br:4.2,of:5.4,r:"EPIC",v:95000,co:"Germany"},
    {m:"R8 V10 performance",y:2020,pi:738,c:"S1",sp:8.1,ha:6.4,ac:8.0,la:6.1,br:6.8,of:5.7,r:"RARE",v:281000,co:"Germany"},
    {m:"RS 3 Sedan",y:2020,pi:617,c:"A",sp:6.7,ha:5.7,ac:6.4,la:7.9,br:4.6,of:5.9,r:"RARE",v:52000,co:"Germany"},
    {m:"RS 4 Avant",y:2018,pi:637,c:"A",sp:7.2,ha:5.6,ac:7.1,la:9.4,br:4.9,of:5.6,r:"RARE",v:50000,co:"Germany"},
    {m:"R8 V10 plus",y:2016,pi:731,c:"S1",sp:7.8,ha:6.4,ac:7.7,la:5.9,br:7.2,of:5.7,r:"EPIC",v:160000,co:"Germany"},
    {m:"RS 6 Avant",y:2015,pi:640,c:"A",sp:7.4,ha:5.5,ac:7.5,la:8.3,br:5.3,of:5.6,r:"RARE",v:60000,co:"Germany"},
    {m:"S1",y:2015,pi:527,c:"B",sp:5.6,ha:5.5,ac:5.2,la:4.4,br:3.7,of:5.9,r:"COMMON",v:21000,co:"Germany"},
    {m:"R8 Coupe V10 plus 5.2 FSI quattro",y:2013,pi:694,c:"A",sp:7.3,ha:6.2,ac:7.1,la:6.6,br:6.8,of:5.5,r:"EPIC",v:100000,co:"Germany"},
    {m:"RS 4 Avant",y:2013,pi:607,c:"A",sp:7.0,ha:5.7,ac:5.5,la:5.2,br:5.2,of:5.7,r:"RARE",v:30000,co:"Germany"},
    {m:"RS 7 Sportback",y:2013,pi:620,c:"A",sp:7.6,ha:5.3,ac:7.0,la:8.2,br:5.6,of:5.7,r:"EPIC",v:55000,co:"Germany"},
    {m:"RS 3 Sportback",y:2011,pi:565,c:"B",sp:6.0,ha:5.6,ac:5.2,la:6.5,br:4.1,of:5.8,r:"COMMON",v:20000,co:"Germany"},
    {m:"RS 5 Coupe",y:2011,pi:613,c:"A",sp:6.8,ha:5.7,ac:5.8,la:5.7,br:5.9,of:5.8,r:"RARE",v:25000,co:"Germany"},
    {m:"TT RS Coupe",y:2010,pi:593,c:"B",sp:6.6,ha:5.6,ac:5.8,la:7.0,br:4.4,of:5.8,r:"RARE",v:35000,co:"Germany"},
    {m:"R8 LMS",y:2009,pi:810,c:"S2",sp:7.2,ha:8.1,ac:7.7,la:7.7,br:9.5,of:4.4,r:"RARE",v:900000,co:"Germany"},
    {m:"RS 6",y:2009,pi:598,c:"B",sp:7.5,ha:5.5,ac:6.1,la:6.7,br:5.8,of:5.8,r:"EPIC",v:42000,co:"Germany"},
    {m:"RS 4",y:2006,pi:593,c:"B",sp:6.9,ha:5.5,ac:6.0,la:5.5,br:4.4,of:5.7,r:"RARE",v:75000,co:"Germany"},
    {m:"RS 6",y:2003,pi:556,c:"B",sp:6.8,ha:5.2,ac:5.0,la:4.9,br:4.1,of:5.8,r:"RARE",v:35000,co:"Germany"},
    {m:"RS 4 Avant",y:2001,pi:544,c:"B",sp:6.4,ha:5.3,ac:5.5,la:4.7,br:3.6,of:5.7,r:"COMMON",v:175000,co:"Germany"},
    {m:"#2 Audi Sport quattro S1",y:1986,pi:726,c:"S1",sp:6.3,ha:5.9,ac:8.9,la:2.4,br:5.4,of:8.1,r:"LEGENDARY",v:750000,co:"Germany"},
    {m:"Sport quattro",y:1983,pi:526,c:"B",sp:5.7,ha:4.7,ac:5.5,la:2.9,br:4.0,of:6.0,r:"EPIC",v:650000,co:"Germany"},
  ],
  "Austin-Healey": [
    {m:"3000 MkIII",y:1965,pi:352,c:"D",sp:5.2,ha:3.5,ac:3.5,la:3.4,br:2.4,of:4.9,r:"COMMON",v:75000,co:"United Kingdom"},
  ],
  "Autozam": [
    {m:"AZ-1",y:1993,pi:342,c:"D",sp:4.2,ha:4.2,ac:3.0,la:4.4,br:3.0,of:5.2,r:"RARE",v:38000,co:"Japan"},
  ],
  "BAC": [
    {m:"Mono",y:2014,pi:766,c:"S1",sp:6.1,ha:7.4,ac:6.3,la:6.7,br:8.1,of:4.5,r:"EPIC",v:196000,co:"United Kingdom"},
  ],
  "BMW": [
    {m:"X6 M Competition",y:2024,pi:672,c:"A",sp:7.1,ha:5.3,ac:8.5,la:9.8,br:5.0,of:5.8,r:"EPIC",v:140000,co:"Germany"},
    {m:"M2",y:2023,pi:647,c:"A",sp:6.8,ha:5.9,ac:5.6,la:5.6,br:5.2,of:5.0,r:"RARE",v:67000,co:"Germany"},
    {m:"M2 Forza Edition",y:2023,pi:700,c:"A",sp:6.9,ha:6.2,ac:5.4,la:5.7,br:5.8,of:4.6,r:"FORZA",v:500000,co:"Germany"},
    {m:"M5 CS",y:2022,pi:730,c:"S1",sp:7.6,ha:6.0,ac:9.5,la:10.0,br:6.7,of:5.6,r:"RARE",v:150000,co:"Germany"},
    {m:"iX xDrive50",y:2022,pi:595,c:"B",sp:4.3,ha:4.1,ac:5.2,la:5.4,br:3.5,of:6.1,r:"RARE",v:37000,co:"Germany"},
    {m:"M4 Competition Coupe",y:2021,pi:666,c:"A",sp:7.1,ha:5.4,ac:5.2,la:5.5,br:5.2,of:5.5,r:"RARE",v:64000,co:"Germany"},
    {m:"M4 Competition Coupe Welcome Pack",y:2021,pi:800,c:"S1",sp:7.7,ha:7.1,ac:6.1,la:6.6,br:6.8,of:4.8,r:"LEGENDARY",v:150000,co:"Germany"},
    {m:"M2 Competition Coupe",y:2020,pi:656,c:"A",sp:6.8,ha:5.3,ac:5.3,la:5.6,br:5.3,of:5.1,r:"EPIC",v:250000,co:"Germany"},
    {m:"M8 Competition Coupe",y:2020,pi:684,c:"A",sp:7.7,ha:5.7,ac:8.6,la:9.7,br:6.3,of:5.7,r:"RARE",v:100000,co:"Germany"},
    {m:"Z4 Roadster",y:2019,pi:634,c:"A",sp:6.7,ha:5.3,ac:5.6,la:6.0,br:4.4,of:5.1,r:"COMMON",v:38000,co:"Germany"},
    {m:"M4 GTS",y:2016,pi:711,c:"S1",sp:7.2,ha:6.8,ac:5.7,la:6.0,br:7.0,of:4.6,r:"EPIC",v:125000,co:"Germany"},
    {m:"i8",y:2015,pi:665,c:"A",sp:7.2,ha:5.8,ac:7.7,la:8.7,br:4.6,of:5.3,r:"RARE",v:70000,co:"Germany"},
    {m:"M4 Coupe",y:2014,pi:679,c:"A",sp:7.1,ha:5.6,ac:5.3,la:5.6,br:6.5,of:5.2,r:"RARE",v:55000,co:"Germany"},
    {m:"M5",y:2012,pi:652,c:"A",sp:7.4,ha:5.4,ac:5.3,la:5.6,br:4.8,of:5.1,r:"RARE",v:40000,co:"Germany"},
    {m:"X5 M",y:2011,pi:546,c:"B",sp:6.4,ha:4.3,ac:5.9,la:6.6,br:3.7,of:6.6,r:"COMMON",v:24000,co:"Germany"},
    {m:"M3 GTS",y:2010,pi:678,c:"A",sp:7.3,ha:6.8,ac:5.5,la:5.9,br:5.6,of:4.8,r:"EPIC",v:198000,co:"Germany"},
    {m:"M5",y:2009,pi:595,c:"B",sp:7.1,ha:5.3,ac:5.1,la:4.9,br:4.4,of:5.4,r:"RARE",v:54000,co:"Germany"},
    {m:"M3",y:2008,pi:608,c:"A",sp:6.8,ha:5.3,ac:5.0,la:5.3,br:4.5,of:5.0,r:"COMMON",v:43000,co:"Germany"},
    {m:"Z4 M Coupe",y:2008,pi:579,c:"B",sp:6.4,ha:5.4,ac:5.4,la:4.9,br:4.3,of:5.6,r:"RARE",v:63000,co:"Germany"},
    {m:"M3",y:2005,pi:554,c:"B",sp:6.4,ha:4.7,ac:5.0,la:5.0,br:3.8,of:5.5,r:"COMMON",v:35000,co:"Germany"},
    {m:"M5",y:2003,pi:580,c:"B",sp:7.1,ha:5.0,ac:5.0,la:5.2,br:3.8,of:5.5,r:"COMMON",v:47000,co:"Germany"},
    {m:"M3",y:1997,pi:549,c:"B",sp:6.5,ha:4.5,ac:4.9,la:5.2,br:3.6,of:5.6,r:"COMMON",v:30000,co:"Germany"},
    {m:"850CSi",y:1995,pi:493,c:"C",sp:6.7,ha:4.6,ac:4.6,la:4.1,br:3.2,of:5.3,r:"RARE",v:135000,co:"Germany"},
    {m:"M5",y:1995,pi:516,c:"B",sp:6.7,ha:4.7,ac:4.6,la:4.2,br:3.6,of:5.2,r:"RARE",v:48000,co:"Germany"},
    {m:"M3",y:1988,pi:474,c:"C",sp:5.7,ha:4.5,ac:4.4,la:4.5,br:3.1,of:5.3,r:"RARE",v:250000,co:"Germany"},
    {m:"M5",y:1988,pi:469,c:"C",sp:5.8,ha:4.1,ac:4.3,la:3.9,br:3.1,of:5.4,r:"RARE",v:70000,co:"Germany"},
    {m:"M1",y:1981,pi:510,c:"B",sp:5.9,ha:4.5,ac:4.4,la:3.1,br:3.2,of:5.1,r:"TREASURE",v:600000,co:"Germany"},
    {m:"2002 Turbo",y:1973,pi:425,c:"C",sp:4.9,ha:4.1,ac:3.8,la:1.5,br:2.8,of:5.8,r:"LEGENDARY",v:127000,co:"Germany"},
    {m:"Isetta 300 Export",y:1957,pi:100,c:"D",sp:1.9,ha:3.0,ac:1.2,la:2.7,br:2.4,of:5.1,r:"COMMON",v:84000,co:"Germany"},
  ],
  "Bentley": [
    {m:"Continental GT Convertible",y:2021,pi:649,c:"A",sp:7.7,ha:5.3,ac:6.2,la:9.6,br:4.3,of:5.5,r:"RARE",v:170000,co:"United Kingdom"},
    {m:"Bentayga",y:2016,pi:612,c:"A",sp:7.0,ha:4.7,ac:6.2,la:7.4,br:4.0,of:6.8,r:"EPIC",v:250000,co:"United Kingdom"},
  ],
  "Buick": [
    {m:"Regal GNX",y:1987,pi:454,c:"C",sp:5.7,ha:3.7,ac:3.8,la:2.5,br:2.5,of:5.7,r:"EPIC",v:255000,co:"United States"},
  ],
  "Cadillac": [
    {m:"CT4-V Blackwing",y:2022,pi:650,c:"A",sp:7.0,ha:5.8,ac:5.6,la:2.7,br:4.9,of:5.6,r:"RARE",v:55000,co:"United States"},
    {m:"CT5-V Blackwing",y:2022,pi:701,c:"S1",sp:7.4,ha:5.6,ac:5.6,la:5.4,br:6.7,of:5.3,r:"RARE",v:90000,co:"United States"},
    {m:"ATS-V",y:2016,pi:601,c:"A",sp:7.0,ha:5.0,ac:5.2,la:3.4,br:4.2,of:5.6,r:"COMMON",v:41000,co:"United States"},
    {m:"CTS-V Sedan",y:2016,pi:648,c:"A",sp:7.2,ha:4.8,ac:4.9,la:5.2,br:4.4,of:5.0,r:"COMMON",v:60000,co:"United States"},
    {m:"XTS Limousine",y:2013,pi:381,c:"D",sp:5.3,ha:4.5,ac:2.7,la:1.8,br:3.0,of:5.8,r:"RARE",v:44000,co:"United States"},
  ],
  "Can-Am": [
    {m:"Maverick X RS Turbo R",y:2018,pi:568,c:"B",sp:4.1,ha:3.7,ac:6.8,la:9.6,br:4.5,of:9.8,r:"COMMON",v:16000,co:"Canada"},
  ],
  "Casey Currie Motorsports": [
    {m:"Trophy Jeep",y:2019,pi:641,c:"A",sp:5.2,ha:3.1,ac:5.0,la:4.6,br:5.4,of:9.3,r:"EPIC",v:250000,co:"United States"},
  ],
  "Chevrolet": [
    {m:"Corvette E-Ray",y:2024,pi:737,c:"S1",sp:7.2,ha:6.9,ac:9.5,la:9.6,br:7.3,of:5.4,r:"EPIC",v:114000,co:"United States"},
    {m:"Corvette Z06",y:2023,pi:763,c:"S1",sp:7.2,ha:6.9,ac:7.4,la:8.2,br:7.7,of:5.0,r:"EPIC",v:155000,co:"United States"},
    {m:"Corvette Stingray Coupe",y:2020,pi:699,c:"A",sp:7.2,ha:6.2,ac:6.9,la:7.6,br:5.2,of:5.4,r:"RARE",v:65000,co:"United States"},
    {m:"Silverado LT Trail Boss",y:2020,pi:449,c:"C",sp:5.4,ha:2.8,ac:4.9,la:4.2,br:3.1,of:8.6,r:"RARE",v:43000,co:"United States"},
    {m:"Corvette ZR1",y:2019,pi:778,c:"S1",sp:7.8,ha:6.7,ac:6.5,la:7.0,br:7.7,of:4.6,r:"EPIC",v:250000,co:"United States"},
    {m:"Camaro ZL1 1LE",y:2018,pi:728,c:"S1",sp:7.0,ha:6.8,ac:5.8,la:5.2,br:5.8,of:4.9,r:"RARE",v:70000,co:"United States"},
    {m:"Camaro ZL1",y:2017,pi:727,c:"S1",sp:7.3,ha:6.4,ac:6.1,la:4.9,br:5.5,of:5.2,r:"RARE",v:55000,co:"United States"},
    {m:"Camaro Z28",y:2015,pi:695,c:"A",sp:6.7,ha:5.9,ac:5.5,la:5.4,br:7.2,of:5.0,r:"RARE",v:65000,co:"United States"},
    {m:"Corvette Z06",y:2015,pi:755,c:"S1",sp:7.8,ha:6.1,ac:6.0,la:6.5,br:7.5,of:5.0,r:"RARE",v:100000,co:"United States"},
    {m:"Corvette ZR1",y:2009,pi:712,c:"S1",sp:7.8,ha:5.7,ac:5.5,la:4.6,br:6.6,of:4.8,r:"RARE",v:125000,co:"United States"},
    {m:"Corvette Z06",y:2002,pi:602,c:"A",sp:7.2,ha:5.2,ac:4.6,la:4.5,br:3.9,of:5.0,r:"COMMON",v:33000,co:"United States"},
    {m:"Impala Super Sport",y:1996,pi:407,c:"C",sp:5.0,ha:4.0,ac:3.6,la:2.6,br:2.7,of:5.5,r:"COMMON",v:30000,co:"United States"},
    {m:"Corvette ZR-1",y:1995,pi:576,c:"B",sp:6.5,ha:4.5,ac:4.8,la:4.0,br:3.7,of:5.1,r:"COMMON",v:76000,co:"United States"},
    {m:"Monte Carlo Super Sport",y:1988,pi:282,c:"D",sp:5.0,ha:3.8,ac:3.1,la:2.3,br:2.0,of:5.2,r:"COMMON",v:30000,co:"United States"},
    {m:"Camaro Z28",y:1979,pi:364,c:"D",sp:4.5,ha:3.9,ac:3.5,la:2.9,br:2.5,of:5.6,r:"RARE",v:20000,co:"United States"},
    {m:"K-10 Custom",y:1972,pi:268,c:"D",sp:3.6,ha:3.0,ac:3.0,la:2.6,br:2.7,of:8.3,r:"COMMON",v:49000,co:"United States"},
    {m:"Camaro Z28",y:1970,pi:430,c:"C",sp:5.1,ha:3.5,ac:3.4,la:3.3,br:2.4,of:5.1,r:"RARE",v:55000,co:"United States"},
    {m:"Chevelle Super Sport 454",y:1970,pi:424,c:"C",sp:4.7,ha:3.4,ac:3.3,la:3.2,br:2.4,of:5.5,r:"RARE",v:90000,co:"United States"},
    {m:"Corvette ZR-1",y:1970,pi:497,c:"C",sp:4.9,ha:4.1,ac:3.9,la:2.9,br:3.1,of:5.6,r:"EPIC",v:250000,co:"United States"},
    {m:"El Camino Super Sport 454",y:1970,pi:430,c:"C",sp:5.9,ha:3.4,ac:3.2,la:3.1,br:2.4,of:5.6,r:"RARE",v:36000,co:"United States"},
    {m:"Camaro Super Sport Coupe",y:1969,pi:471,c:"C",sp:5.0,ha:4.0,ac:3.8,la:2.9,br:3.1,of:5.9,r:"RARE",v:75000,co:"United States"},
    {m:"Nova Super Sport 396",y:1969,pi:431,c:"C",sp:5.4,ha:3.6,ac:3.5,la:2.9,br:2.4,of:5.5,r:"COMMON",v:40000,co:"United States"},
    {m:"Corvette Stingray 427",y:1967,pi:510,c:"B",sp:5.5,ha:4.1,ac:3.9,la:3.0,br:3.1,of:6.0,r:"EPIC",v:135000,co:"United States"},
    {m:"Impala Super Sport 409",y:1964,pi:427,c:"C",sp:5.5,ha:3.4,ac:3.4,la:3.0,br:2.3,of:5.6,r:"COMMON",v:70000,co:"United States"},
    {m:"Corvette",y:1960,pi:428,c:"C",sp:5.4,ha:3.8,ac:3.6,la:2.8,br:2.5,of:5.8,r:"EPIC",v:250000,co:"United States"},
    {m:"Bel Air",y:1957,pi:320,c:"D",sp:4.8,ha:3.6,ac:2.8,la:1.6,br:2.1,of:6.2,r:"RARE",v:69000,co:"United States"},
    {m:"150 Utility Sedan",y:1955,pi:221,c:"D",sp:4.3,ha:3.4,ac:3.0,la:2.8,br:2.0,of:6.0,r:"COMMON",v:140000,co:"United States"},
    {m:"Corvette",y:1953,pi:270,c:"D",sp:4.6,ha:3.9,ac:2.3,la:1.1,br:2.0,of:5.8,r:"LEGENDARY",v:269000,co:"United States"},
  ],
  "Datsun": [
    {m:"510",y:1970,pi:143,c:"D",sp:3.7,ha:3.4,ac:2.8,la:2.3,br:1.9,of:5.3,r:"COMMON",v:86000,co:"Japan"},
    {m:"2000 Roadster",y:1969,pi:323,c:"D",sp:4.2,ha:4.1,ac:2.8,la:1.8,br:2.6,of:5.7,r:"COMMON",v:250000,co:"Japan"},
  ],
  "DeBerti": [
    {m:"Ford Super Duty F-250",y:2019,pi:548,c:"B",sp:5.6,ha:3.7,ac:4.9,la:3.8,br:3.8,of:10.0,r:"EPIC",v:275000,co:"United States"},
    {m:"Toyota Tacoma TRD",y:2019,pi:717,c:"S1",sp:6.4,ha:5.1,ac:4.9,la:5.1,br:6.6,of:4.9,r:"COMMON",v:250000,co:"United States"},
    {m:"Chevrolet Silverado 1500 Drift Truck",y:2018,pi:707,c:"S1",sp:6.7,ha:4.5,ac:4.9,la:5.1,br:5.2,of:4.2,r:"EPIC",v:250000,co:"United States"},
    {m:"Wrangler Unlimited",y:2013,pi:645,c:"A",sp:4.7,ha:3.9,ac:6.3,la:4.8,br:4.4,of:9.4,r:"EPIC",v:150000,co:"United States"},
  ],
  "DeLorean": [
    {m:"DMC-12",y:1982,pi:357,c:"D",sp:4.3,ha:4.7,ac:2.8,la:2.3,br:3.1,of:6.2,r:"LEGENDARY",v:72000,co:"United States"},
  ],
  "Dodge": [
    {m:"Challenger SRT Super Stock",y:2022,pi:695,c:"A",sp:7.6,ha:5.2,ac:5.2,la:5.5,br:4.7,of:4.7,r:"RARE",v:87000,co:"United States"},
    {m:"Durango SRT Hellcat",y:2021,pi:628,c:"A",sp:7.0,ha:4.4,ac:8.4,la:7.6,br:4.3,of:6.3,r:"EPIC",v:73000,co:"United States"},
    {m:"Challenger SRT Demon",y:2018,pi:678,c:"A",sp:7.8,ha:5.1,ac:4.8,la:5.0,br:5.3,of:5.0,r:"RARE",v:90000,co:"United States"},
    {m:"Viper ACR",y:2016,pi:786,c:"S1",sp:7.1,ha:7.6,ac:6.5,la:5.6,br:9.1,of:4.9,r:"EPIC",v:290000,co:"United States"},
    {m:"Challenger SRT Hellcat",y:2015,pi:631,c:"A",sp:7.7,ha:4.7,ac:4.5,la:4.6,br:4.9,of:4.8,r:"RARE",v:53000,co:"United States"},
    {m:"Charger SRT Hellcat",y:2015,pi:637,c:"A",sp:7.8,ha:4.8,ac:4.7,la:4.9,br:5.0,of:5.1,r:"RARE",v:44000,co:"United States"},
    {m:"Viper SRT-10 ACR",y:2008,pi:735,c:"S1",sp:7.2,ha:6.8,ac:5.6,la:4.7,br:7.1,of:5.4,r:"RARE",v:115000,co:"United States"},
    {m:"Ram SRT-10",y:2006,pi:547,c:"B",sp:5.9,ha:4.5,ac:4.9,la:4.2,br:4.1,of:6.0,r:"COMMON",v:250000,co:"United States"},
    {m:"Viper GTS ACR",y:1999,pi:598,c:"B",sp:6.9,ha:4.9,ac:5.2,la:4.1,br:4.0,of:5.0,r:"LEGENDARY",v:68000,co:"United States"},
    {m:"Viper GTS ACR Forza Edition",y:1999,pi:700,c:"A",sp:8.1,ha:4.2,ac:5.7,la:6.0,br:4.7,of:9.9,r:"FORZA",v:500000,co:"United States"},
    {m:"Challenger RT",y:1970,pi:443,c:"C",sp:5.5,ha:3.5,ac:3.4,la:3.3,br:2.5,of:5.2,r:"EPIC",v:525000,co:"United States"},
    {m:"Coronet Super Bee",y:1970,pi:455,c:"C",sp:5.8,ha:3.1,ac:3.5,la:3.4,br:2.4,of:5.3,r:"RARE",v:175000,co:"United States"},
    {m:"Charger Daytona HEMI",y:1969,pi:479,c:"C",sp:5.0,ha:3.5,ac:3.8,la:3.7,br:2.8,of:5.6,r:"EPIC",v:541000,co:"United States"},
    {m:"Charger RT",y:1969,pi:417,c:"C",sp:5.1,ha:3.5,ac:3.6,la:3.5,br:2.4,of:5.3,r:"TREASURE",v:224000,co:"United States"},
    {m:"Dart HEMI Super Stock",y:1968,pi:540,c:"B",sp:3.8,ha:3.3,ac:4.1,la:4.2,br:2.9,of:5.1,r:"LEGENDARY",v:300000,co:"United States"},
  ],
  "Ferrari": [
    {m:"296 GTB",y:2022,pi:811,c:"S2",sp:8.1,ha:6.9,ac:7.0,la:7.7,br:7.7,of:4.7,r:"EPIC",v:380000,co:"Italy"},
    {m:"Roma",y:2020,pi:735,c:"S1",sp:7.4,ha:5.8,ac:5.9,la:6.3,br:6.9,of:4.9,r:"EPIC",v:250000,co:"Italy"},
    {m:"SF90 Stradale",y:2020,pi:851,c:"S2",sp:8.8,ha:7.3,ac:9.8,la:10.0,br:7.7,of:5.0,r:"LEGENDARY",v:575000,co:"Italy"},
    {m:"488 Pista",y:2019,pi:803,c:"S2",sp:7.6,ha:7.3,ac:7.0,la:7.6,br:8.0,of:4.6,r:"EPIC",v:716000,co:"Italy"},
    {m:"F8 Tributo",y:2019,pi:802,c:"S2",sp:8.4,ha:7.3,ac:7.2,la:7.9,br:7.8,of:4.9,r:"LEGENDARY",v:333000,co:"Italy"},
    {m:"Monza SP2",y:2019,pi:773,c:"S1",sp:8.6,ha:6.6,ac:6.1,la:6.6,br:7.1,of:4.3,r:"LEGENDARY",v:2500000,co:"Italy"},
    {m:"FXX-K Evo",y:2018,pi:957,c:"R",sp:8.4,ha:9.5,ac:8.3,la:9.1,br:10.0,of:4.6,r:"LEGENDARY",v:4500000,co:"Italy"},
    {m:"FXX-K Evo Welcome Pack",y:2018,pi:998,c:"R",sp:8.1,ha:9.4,ac:8.7,la:9.4,br:10.0,of:4.9,r:"LEGENDARY",v:250000,co:"Italy"},
    {m:"Portofino",y:2018,pi:714,c:"S1",sp:7.8,ha:6.0,ac:6.3,la:6.8,br:6.7,of:5.1,r:"EPIC",v:200000,co:"Italy"},
    {m:"812 Superfast",y:2017,pi:780,c:"S1",sp:7.9,ha:6.6,ac:6.2,la:6.6,br:7.4,of:4.5,r:"LEGENDARY",v:395000,co:"Italy"},
    {m:"J50",y:2017,pi:772,c:"S1",sp:8.5,ha:6.7,ac:6.7,la:7.4,br:7.2,of:4.7,r:"RARE",v:2500000,co:"Italy"},
    {m:"J50 Preorder Car",y:2017,pi:800,c:"S1",sp:8.2,ha:7.1,ac:7.0,la:7.6,br:7.6,of:4.7,r:"LEGENDARY",v:309000,co:"Italy"},
    {m:"488 GTB",y:2015,pi:770,c:"S1",sp:8.2,ha:7.0,ac:6.8,la:6.5,br:7.5,of:4.9,r:"EPIC",v:250000,co:"Italy"},
    {m:"F12tdf",y:2015,pi:788,c:"S1",sp:8.8,ha:6.7,ac:6.5,la:7.0,br:8.0,of:5.2,r:"EPIC",v:500000,co:"Italy"},
    {m:"FXX K",y:2014,pi:936,c:"R",sp:8.4,ha:9.3,ac:8.1,la:9.0,br:10.0,of:4.3,r:"LEGENDARY",v:4300000,co:"Italy"},
    {m:"458 Speciale",y:2013,pi:768,c:"S1",sp:7.7,ha:7.0,ac:6.9,la:7.5,br:7.6,of:4.4,r:"EPIC",v:500000,co:"Italy"},
    {m:"LaFerrari",y:2013,pi:857,c:"S2",sp:9.4,ha:8.0,ac:7.2,la:7.9,br:9.1,of:4.8,r:"LEGENDARY",v:3000000,co:"Italy"},
    {m:"599XX Evolution",y:2012,pi:894,c:"S2",sp:8.3,ha:9.1,ac:7.3,la:7.9,br:10.0,of:4.4,r:"LEGENDARY",v:3200000,co:"Italy"},
    {m:"599XX",y:2010,pi:840,c:"S2",sp:8.1,ha:7.8,ac:7.2,la:7.9,br:9.1,of:4.1,r:"LEGENDARY",v:2000000,co:"Italy"},
    {m:"458 Italia",y:2009,pi:721,c:"S1",sp:7.9,ha:6.5,ac:6.3,la:6.8,br:6.8,of:4.6,r:"EPIC",v:210000,co:"Italy"},
    {m:"430 Scuderia",y:2007,pi:702,c:"S1",sp:7.6,ha:6.0,ac:6.2,la:6.4,br:6.8,of:4.9,r:"EPIC",v:355000,co:"Italy"},
    {m:"FXX",y:2005,pi:900,c:"S2",sp:8.7,ha:9.4,ac:8.1,la:8.9,br:10.0,of:4.9,r:"LEGENDARY",v:2500000,co:"Italy"},
    {m:"Enzo Ferrari",y:2002,pi:755,c:"S1",sp:8.1,ha:6.6,ac:6.4,la:6.9,br:7.9,of:5.2,r:"LEGENDARY",v:3500000,co:"Italy"},
    {m:"F50 GT",y:1996,pi:948,c:"R",sp:8.1,ha:9.3,ac:8.1,la:8.9,br:10.0,of:4.2,r:"LEGENDARY",v:5500000,co:"Italy"},
    {m:"F50",y:1995,pi:678,c:"A",sp:7.3,ha:5.8,ac:5.7,la:5.0,br:5.5,of:5.3,r:"LEGENDARY",v:4500000,co:"Italy"},
    {m:"F355 Berlinetta",y:1994,pi:588,c:"B",sp:6.8,ha:5.5,ac:4.5,la:3.6,br:4.3,of:5.3,r:"EPIC",v:250000,co:"Italy"},
    {m:"512 TR",y:1992,pi:615,c:"A",sp:7.2,ha:5.5,ac:4.9,la:3.8,br:4.5,of:5.1,r:"EPIC",v:350000,co:"Italy"},
    {m:"F40 Competizione",y:1989,pi:948,c:"R",sp:8.5,ha:9.7,ac:7.3,la:2.0,br:10.0,of:5.2,r:"LEGENDARY",v:3200000,co:"Italy"},
    {m:"F40",y:1987,pi:678,c:"A",sp:7.3,ha:5.9,ac:6.3,la:2.6,br:5.2,of:5.4,r:"LEGENDARY",v:2000000,co:"Italy"},
    {m:"288 GTO",y:1984,pi:643,c:"A",sp:7.4,ha:5.1,ac:5.6,la:3.1,br:4.2,of:5.1,r:"LEGENDARY",v:2800000,co:"Italy"},
    {m:"512 S",y:1970,pi:774,c:"S1",sp:7.9,ha:6.5,ac:6.5,la:6.0,br:5.6,of:4.9,r:"LEGENDARY",v:3600000,co:"Italy"},
    {m:"Dino 246 GT",y:1969,pi:428,c:"C",sp:5.2,ha:4.5,ac:3.2,la:2.0,br:2.8,of:5.6,r:"EPIC",v:390000,co:"Italy"},
    {m:"24 330 P4",y:1967,pi:684,c:"A",sp:7.2,ha:4.5,ac:6.3,la:5.9,br:4.2,of:4.9,r:"LEGENDARY",v:70000000,co:"Italy"},
    {m:"250 GT Berlinetta Lusso",y:1962,pi:475,c:"C",sp:5.5,ha:3.9,ac:4.1,la:3.0,br:2.9,of:5.6,r:"LEGENDARY",v:1400000,co:"Italy"},
    {m:"250 GTO",y:1962,pi:494,c:"C",sp:6.4,ha:3.6,ac:3.5,la:2.5,br:2.8,of:5.4,r:"LEGENDARY",v:48000000,co:"Italy"},
  ],
  "Ford": [
    {m:"Mustang Dark Horse",y:2024,pi:669,c:"A",sp:7.0,ha:5.8,ac:5.6,la:4.9,br:5.0,of:5.3,r:"EPIC",v:59000,co:"United States"},
    {m:"Mustang GT",y:2024,pi:628,c:"A",sp:6.7,ha:5.1,ac:5.2,la:5.2,br:4.4,of:5.4,r:"EPIC",v:45000,co:"United States"},
    {m:"F-150 Raptor R",y:2023,pi:536,c:"B",sp:6.2,ha:2.8,ac:6.8,la:5.8,br:3.2,of:8.7,r:"EPIC",v:110000,co:"United States"},
    {m:"F-150 Raptor R Welcome Pack",y:2023,pi:600,c:"B",sp:6.2,ha:3.4,ac:7.3,la:6.8,br:4.3,of:9.7,r:"LEGENDARY",v:50000,co:"United States"},
    {m:"Fiesta ST",y:2023,pi:500,c:"C",sp:5.2,ha:4.9,ac:4.2,la:4.3,br:3.7,of:5.2,r:"COMMON",v:26000,co:"United States"},
    {m:"Bronco Raptor",y:2022,pi:473,c:"C",sp:5.1,ha:3.4,ac:4.8,la:5.3,br:3.3,of:9.4,r:"EPIC",v:50000,co:"United States"},
    {m:"F-150 Lightning",y:2022,pi:500,c:"C",sp:3.8,ha:2.6,ac:5.1,la:5.4,br:2.9,of:8.3,r:"EPIC",v:250000,co:"United States"},
    {m:"Focus ST",y:2022,pi:594,c:"B",sp:6.0,ha:5.2,ac:4.5,la:4.7,br:4.2,of:5.3,r:"COMMON",v:34000,co:"United States"},
    {m:"Supervan 4",y:2022,pi:919,c:"R",sp:7.9,ha:7.5,ac:10.0,la:10.0,br:8.6,of:4.3,r:"EPIC",v:2000000,co:"United States"},
    {m:"2069 Bronco R",y:2020,pi:441,c:"C",sp:4.2,ha:4.0,ac:3.2,la:5.2,br:4.8,of:10.0,r:"EPIC",v:450000,co:"United States"},
    {m:"Mustang Shelby GT500",y:2020,pi:734,c:"S1",sp:7.7,ha:6.0,ac:5.8,la:6.1,br:5.5,of:5.2,r:"RARE",v:125000,co:"United States"},
    {m:"Super Duty F-450 PLATINUM",y:2020,pi:379,c:"D",sp:4.6,ha:2.8,ac:4.3,la:7.3,br:2.7,of:8.4,r:"COMMON",v:65000,co:"United States"},
    {m:"Super Duty F-450 PLATINUM Forza Edition",y:2020,pi:700,c:"A",sp:7.6,ha:3.8,ac:8.7,la:9.8,br:4.9,of:9.7,r:"FORZA",v:500000,co:"United States"},
    {m:"Mustang RTR Spec 5",y:2018,pi:648,c:"A",sp:6.5,ha:5.6,ac:5.1,la:5.4,br:4.8,of:5.1,r:"RARE",v:35000,co:"United States"},
    {m:"14 Rahal Letterman Racing Fiesta",y:2017,pi:772,c:"S1",sp:5.0,ha:5.4,ac:9.2,la:10.0,br:5.8,of:7.9,r:"EPIC",v:150000,co:"United States"},
    {m:"25 Brocky Ultra4 Bronco RTR",y:2017,pi:644,c:"A",sp:4.7,ha:4.1,ac:6.1,la:5.2,br:5.2,of:10.0,r:"EPIC",v:75000,co:"United States"},
    {m:"Focus RS",y:2017,pi:588,c:"B",sp:6.2,ha:5.6,ac:5.8,la:3.7,br:4.2,of:5.9,r:"EPIC",v:37000,co:"United States"},
    {m:"GT",y:2017,pi:757,c:"S1",sp:8.3,ha:6.3,ac:6.6,la:3.6,br:8.3,of:4.9,r:"EPIC",v:500000,co:"United States"},
    {m:"M-Sport Fiesta RS",y:2017,pi:707,c:"S1",sp:4.9,ha:5.7,ac:8.7,la:8.4,br:5.9,of:8.6,r:"EPIC",v:250000,co:"United States"},
    {m:"Mustang Shelby GT350R",y:2016,pi:721,c:"S1",sp:7.2,ha:6.2,ac:6.1,la:6.2,br:6.0,of:5.7,r:"RARE",v:88000,co:"United States"},
    {m:"11 Rockstar F-150 Trophy Truck",y:2014,pi:613,c:"A",sp:5.5,ha:3.3,ac:4.6,la:4.5,br:4.8,of:9.1,r:"EPIC",v:450000,co:"United States"},
    {m:"FPV Pursuit Ute",y:2014,pi:563,c:"B",sp:6.3,ha:4.6,ac:4.7,la:4.9,br:3.7,of:5.4,r:"COMMON",v:40000,co:"United States"},
    {m:"Ranger T6 Rally Raid",y:2014,pi:530,c:"B",sp:4.8,ha:4.6,ac:5.4,la:7.8,br:4.0,of:8.6,r:"EPIC",v:350000,co:"United States"},
    {m:"Mustang Shelby GT500",y:2013,pi:647,c:"A",sp:7.4,ha:4.7,ac:4.7,la:4.6,br:4.3,of:5.3,r:"RARE",v:60000,co:"United States"},
    {m:"Transit SuperSportVan",y:2011,pi:235,c:"D",sp:4.5,ha:3.7,ac:2.7,la:3.1,br:2.3,of:5.7,r:"RARE",v:42000,co:"United States"},
    {m:"Crown Victoria Police Interceptor",y:2010,pi:354,c:"D",sp:5.2,ha:3.8,ac:3.1,la:1.9,br:2.5,of:5.9,r:"COMMON",v:15000,co:"United States"},
    {m:"Focus RS",y:2009,pi:551,c:"B",sp:5.6,ha:5.1,ac:4.4,la:4.4,br:3.9,of:5.1,r:"EPIC",v:52000,co:"United States"},
    {m:"GT",y:2005,pi:676,c:"A",sp:7.7,ha:6.1,ac:4.7,la:3.3,br:5.2,of:5.6,r:"TREASURE",v:585000,co:"United States"},
    {m:"F-150 SVT Lightning",y:2003,pi:474,c:"C",sp:5.3,ha:4.1,ac:4.2,la:3.0,br:3.4,of:6.4,r:"COMMON",v:250000,co:"United States"},
    {m:"Focus RS",y:2003,pi:484,c:"C",sp:5.1,ha:4.7,ac:4.1,la:2.9,br:3.5,of:5.0,r:"COMMON",v:35000,co:"United States"},
    {m:"4 Focus RS",y:2001,pi:639,c:"A",sp:4.9,ha:5.0,ac:7.1,la:9.6,br:4.0,of:8.3,r:"RARE",v:415000,co:"United States"},
    {m:"Mustang SVT Cobra R",y:2000,pi:528,c:"B",sp:6.7,ha:4.5,ac:4.0,la:4.0,br:3.4,of:4.9,r:"COMMON",v:153000,co:"United States"},
    {m:"Racing Puma",y:1999,pi:401,c:"C",sp:4.9,ha:4.2,ac:3.5,la:2.7,br:3.3,of:5.3,r:"RARE",v:30000,co:"United States"},
    {m:"Supervan 3",y:1994,pi:740,c:"S1",sp:5.1,ha:7.6,ac:7.6,la:4.8,br:8.6,of:4.9,r:"EPIC",v:250000,co:"United States"},
    {m:"Mustang SVT Cobra R",y:1993,pi:432,c:"C",sp:5.3,ha:4.0,ac:3.7,la:2.9,br:2.9,of:5.0,r:"COMMON",v:84000,co:"United States"},
    {m:"Escort RS Cosworth",y:1992,pi:456,c:"C",sp:5.2,ha:4.3,ac:4.3,la:2.8,br:3.1,of:5.6,r:"RARE",v:65000,co:"United States"},
    {m:"Sierra Cosworth RS500",y:1987,pi:484,c:"C",sp:5.6,ha:4.4,ac:4.3,la:2.4,br:3.4,of:5.3,r:"BARN",v:79000,co:"United States"},
    {m:"F-150 XLT Lariat",y:1986,pi:263,c:"D",sp:3.5,ha:3.0,ac:2.6,la:1.6,br:3.0,of:8.3,r:"COMMON",v:45000,co:"United States"},
    {m:"F-150 XLT Lariat Forza Edition",y:1986,pi:850,c:"S2",sp:5.2,ha:5.3,ac:7.7,la:8.7,br:6.8,of:6.0,r:"FORZA",v:500000,co:"United States"},
    {m:"RS200 Evolution",y:1985,pi:710,c:"S1",sp:5.4,ha:5.4,ac:6.9,la:2.3,br:5.0,of:8.0,r:"EPIC",v:420000,co:"United States"},
    {m:"5 Escort RS1800 MkII",y:1977,pi:544,c:"B",sp:4.4,ha:4.3,ac:5.0,la:5.3,br:3.8,of:7.2,r:"EPIC",v:185000,co:"United States"},
    {m:"Capri RS3100",y:1973,pi:394,c:"D",sp:4.8,ha:3.9,ac:3.8,la:3.3,br:2.5,of:5.4,r:"RARE",v:69000,co:"United States"},
    {m:"XB Falcon GT",y:1973,pi:422,c:"C",sp:5.2,ha:3.6,ac:3.3,la:3.2,br:2.7,of:5.2,r:"RARE",v:218000,co:"United States"},
    {m:"Mustang Boss 302",y:1969,pi:468,c:"C",sp:5.5,ha:4.2,ac:3.2,la:2.3,br:3.0,of:6.0,r:"RARE",v:75000,co:"United States"},
    {m:"Mustang GT Fastback",y:1968,pi:394,c:"D",sp:5.7,ha:3.7,ac:3.4,la:3.3,br:2.3,of:5.7,r:"LEGENDARY",v:119000,co:"United States"},
    {m:"Mustang GT Fastback Forza Edition",y:1968,pi:700,c:"A",sp:7.3,ha:5.2,ac:5.2,la:3.4,br:4.3,of:5.2,r:"FORZA",v:500000,co:"United States"},
    {m:"2 GT40 Mk II",y:1966,pi:666,c:"A",sp:7.5,ha:4.5,ac:4.3,la:3.5,br:3.8,of:5.1,r:"LEGENDARY",v:13200000,co:"United States"},
    {m:"Mustang GT Coupe",y:1965,pi:388,c:"D",sp:5.3,ha:3.5,ac:3.3,la:3.2,br:2.3,of:5.6,r:"EPIC",v:52000,co:"United States"},
    {m:"De Luxe Five-Window Coupe",y:1932,pi:100,c:"D",sp:3.2,ha:3.5,ac:1.9,la:2.8,br:1.8,of:5.2,r:"COMMON",v:36000,co:"United States"},
  ],
  "Formula Drift": [
    {m:"64 Forsberg Nissan Z",y:2023,pi:783,c:"S1",sp:7.1,ha:5.3,ac:5.4,la:5.7,br:5.5,of:4.3,r:"EPIC",v:200000,co:"United States"},
    {m:"151 Toyota GR Supra",y:2020,pi:779,c:"S1",sp:6.2,ha:5.0,ac:5.5,la:3.6,br:5.6,of:4.3,r:"EPIC",v:185000,co:"United States"},
    {m:"91 BMW M2",y:2020,pi:748,c:"S1",sp:6.7,ha:4.9,ac:5.2,la:5.6,br:5.0,of:4.2,r:"EPIC",v:150000,co:"United States"},
    {m:"411 Toyota Corolla",y:2019,pi:754,c:"S1",sp:6.7,ha:4.9,ac:5.0,la:5.2,br:5.5,of:4.4,r:"EPIC",v:150000,co:"United States"},
    {m:"530 HSV Maloo",y:2016,pi:710,c:"S1",sp:7.6,ha:5.0,ac:4.6,la:4.8,br:4.3,of:4.4,r:"EPIC",v:150000,co:"United States"},
    {m:"13 Ford Mustang",y:2015,pi:739,c:"S1",sp:5.8,ha:5.0,ac:5.1,la:5.4,br:4.7,of:4.4,r:"EPIC",v:250000,co:"United States"},
    {m:"777 Chevrolet Corvette",y:2013,pi:760,c:"S1",sp:6.4,ha:5.1,ac:5.1,la:5.4,br:4.8,of:4.0,r:"EPIC",v:275000,co:"United States"},
    {m:"99 Mazda RX-8",y:2009,pi:737,c:"S1",sp:6.7,ha:5.0,ac:4.7,la:3.2,br:4.5,of:4.3,r:"EPIC",v:150000,co:"United States"},
    {m:"117 599 GTB Fiorano",y:2007,pi:767,c:"S1",sp:6.8,ha:5.0,ac:5.7,la:6.1,br:4.7,of:4.6,r:"EPIC",v:525000,co:"United States"},
    {m:"43 Dodge Viper SRT10",y:2006,pi:748,c:"S1",sp:7.3,ha:5.1,ac:5.3,la:5.6,br:4.9,of:4.0,r:"EPIC",v:250000,co:"United States"},
    {m:"777 Nissan 240SX",y:1997,pi:748,c:"S1",sp:6.7,ha:4.9,ac:5.2,la:5.5,br:4.4,of:4.3,r:"EPIC",v:150000,co:"United States"},
    {m:"34 Toyota Supra MkIV",y:1995,pi:759,c:"S1",sp:7.7,ha:5.3,ac:5.2,la:3.7,br:5.6,of:4.5,r:"EPIC",v:150000,co:"United States"},
    {m:"98 BMW 325i",y:1989,pi:726,c:"S1",sp:6.9,ha:4.7,ac:5.0,la:5.2,br:4.2,of:4.4,r:"EPIC",v:150000,co:"United States"},
  ],
  "Funco": [
    {m:"Motorsports F9",y:2018,pi:752,c:"S1",sp:5.2,ha:2.9,ac:7.6,la:8.5,br:5.1,of:8.9,r:"EPIC",v:300000,co:"United States"},
  ],
  "GMC": [
    {m:"HUMMER EV Pickup",y:2022,pi:610,c:"A",sp:3.7,ha:2.9,ac:5.2,la:5.6,br:3.5,of:8.2,r:"EPIC",v:95000,co:"United States"},
    {m:"Typhoon",y:1992,pi:435,c:"C",sp:5.2,ha:4.4,ac:5.1,la:2.5,br:2.6,of:5.7,r:"EPIC",v:38000,co:"United States"},
    {m:"Syclone",y:1991,pi:446,c:"C",sp:5.3,ha:4.3,ac:5.4,la:2.6,br:2.6,of:5.7,r:"EPIC",v:46000,co:"United States"},
    {m:"Jimmy",y:1970,pi:416,c:"C",sp:4.4,ha:3.2,ac:4.5,la:3.6,br:3.1,of:9.3,r:"COMMON",v:60000,co:"United States"},
  ],
  "GR": [
    {m:"GT Prototype",y:2025,pi:771,c:"S1",sp:7.9,ha:6.4,ac:6.8,la:7.4,br:7.4,of:5.0,r:"LEGENDARY",v:250000,co:"Japan"},
  ],
  "Gordon Murray Automotive": [
    {m:"T.50",y:2022,pi:871,c:"S2",sp:8.1,ha:8.1,ac:7.7,la:8.4,br:10.0,of:5.1,r:"LEGENDARY",v:3050000,co:"United Kingdom"},
  ],
  "HSV": [
    {m:"GEN-F GTS",y:2014,pi:601,c:"A",sp:7.0,ha:5.0,ac:4.8,la:4.0,br:4.5,of:5.2,r:"RARE",v:81000,co:"Australia"},
    {m:"Gen-F GTS Maloo",y:2014,pi:629,c:"A",sp:6.5,ha:5.0,ac:4.8,la:4.6,br:4.8,of:4.8,r:"COMMON",v:65000,co:"Australia"},
  ],
  "Hennessey": [
    {m:"Venom F5",y:2021,pi:870,c:"S2",sp:10.0,ha:8.0,ac:6.5,la:7.0,br:8.2,of:4.6,r:"LEGENDARY",v:2050000,co:"United States"},
    {m:"Ford F-150 VelociRaptor 6x6",y:2019,pi:520,c:"B",sp:5.2,ha:3.7,ac:5.5,la:2.8,br:4.5,of:10.0,r:"LEGENDARY",v:375000,co:"United States"},
    {m:"Venom GT",y:2012,pi:845,c:"S2",sp:9.8,ha:6.7,ac:6.8,la:7.4,br:7.7,of:4.7,r:"LEGENDARY",v:1400000,co:"United States"},
  ],
  "Holden": [
    {m:"Torana A9X",y:1977,pi:413,c:"C",sp:4.9,ha:3.7,ac:3.4,la:2.8,br:2.7,of:5.4,r:"RARE",v:500000,co:"Australia"},
  ],
  "Honda": [
    {m:"Civic Type R",y:2023,pi:620,c:"A",sp:6.9,ha:5.4,ac:4.7,la:4.9,br:4.7,of:5.3,r:"RARE",v:43000,co:"Japan"},
    {m:"e",y:2022,pi:398,c:"D",sp:3.2,ha:4.6,ac:2.7,la:3.2,br:3.3,of:5.7,r:"COMMON",v:30000,co:"Japan"},
    {m:"Civic Type R",y:2018,pi:608,c:"A",sp:6.7,ha:5.5,ac:4.6,la:4.8,br:4.6,of:5.0,r:"RARE",v:35000,co:"Japan"},
    {m:"Civic Type R",y:2015,pi:585,c:"B",sp:6.5,ha:5.5,ac:4.7,la:4.8,br:4.3,of:5.1,r:"COMMON",v:30000,co:"Japan"},
    {m:"Ridgeline Baja Trophy Truck",y:2015,pi:579,c:"B",sp:5.2,ha:3.5,ac:5.0,la:3.6,br:4.8,of:9.2,r:"EPIC",v:400000,co:"Japan"},
    {m:"Civic Type R",y:2007,pi:454,c:"C",sp:5.3,ha:5.0,ac:4.0,la:3.2,br:3.7,of:5.5,r:"COMMON",v:17000,co:"Japan"},
    {m:"NSX-R",y:2005,pi:570,c:"B",sp:6.4,ha:5.1,ac:5.0,la:3.8,br:4.7,of:5.5,r:"EPIC",v:325000,co:"Japan"},
    {m:"NSX-R GT",y:2005,pi:608,c:"A",sp:6.4,ha:6.0,ac:5.6,la:4.4,br:5.5,of:5.0,r:"BARN",v:600000,co:"Japan"},
    {m:"52 Evasive S2000 WTAC",y:2004,pi:888,c:"S2",sp:6.3,ha:9.5,ac:7.2,la:3.4,br:10.0,of:4.3,r:"EPIC",v:320000,co:"Japan"},
    {m:"Civic Type R",y:2004,pi:480,c:"C",sp:5.4,ha:4.5,ac:4.1,la:3.7,br:3.5,of:5.5,r:"COMMON",v:15000,co:"Japan"},
    {m:"S2000",y:2003,pi:503,c:"B",sp:6.0,ha:4.9,ac:4.2,la:3.7,br:3.3,of:5.3,r:"COMMON",v:55000,co:"Japan"},
    {m:"33 Integra WTAC",y:2001,pi:860,c:"S2",sp:5.9,ha:8.8,ac:6.1,la:6.4,br:10.0,of:4.5,r:"EPIC",v:150000,co:"Japan"},
    {m:"Civic Type R",y:1997,pi:430,c:"C",sp:5.5,ha:4.3,ac:3.7,la:3.0,br:3.0,of:5.1,r:"COMMON",v:30000,co:"Japan"},
    {m:"Acty",y:1994,pi:100,c:"D",sp:2.4,ha:4.5,ac:1.6,la:3.7,br:2.8,of:5.7,r:"COMMON",v:9000,co:"Japan"},
    {m:"Prelude Si",y:1994,pi:410,c:"C",sp:5.0,ha:4.4,ac:3.7,la:3.1,br:3.1,of:5.7,r:"COMMON",v:15000,co:"Japan"},
    {m:"21 Hardrace Civic WTAC",y:1992,pi:913,c:"R",sp:6.5,ha:8.6,ac:6.0,la:5.3,br:10.0,of:4.1,r:"EPIC",v:150000,co:"Japan"},
    {m:"NSX-R",y:1992,pi:572,c:"B",sp:6.2,ha:5.4,ac:4.9,la:3.8,br:4.3,of:5.1,r:"EPIC",v:450000,co:"Japan"},
    {m:"Beat",y:1991,pi:283,c:"D",sp:3.8,ha:4.2,ac:2.2,la:2.7,br:3.0,of:5.3,r:"RARE",v:15000,co:"Japan"},
    {m:"CR-X SiR",y:1991,pi:465,c:"C",sp:5.7,ha:4.6,ac:4.0,la:3.2,br:2.9,of:5.5,r:"COMMON",v:250000,co:"Japan"},
    {m:"19 101 Motorsport CRX WTAC",y:1990,pi:877,c:"S2",sp:5.4,ha:8.9,ac:6.1,la:6.3,br:10.0,of:4.6,r:"EPIC",v:150000,co:"Japan"},
    {m:"Civic Si",y:1986,pi:253,c:"D",sp:4.0,ha:4.1,ac:3.0,la:2.2,br:2.3,of:5.4,r:"EPIC",v:10000,co:"Japan"},
    {m:"City E II",y:1984,pi:203,c:"D",sp:3.0,ha:4.0,ac:3.3,la:3.2,br:3.6,of:5.4,r:"EPIC",v:7500,co:"Japan"},
    {m:"Civic CRX Mugen",y:1984,pi:390,c:"D",sp:4.8,ha:4.3,ac:3.0,la:1.8,br:2.6,of:4.9,r:"EPIC",v:50000,co:"Japan"},
    {m:"Civic RS",y:1974,pi:254,c:"D",sp:3.9,ha:3.9,ac:3.3,la:3.0,br:2.4,of:5.3,r:"COMMON",v:14000,co:"Japan"},
    {m:"S800",y:1970,pi:134,c:"D",sp:3.5,ha:3.5,ac:3.2,la:2.5,br:2.4,of:5.2,r:"COMMON",v:40000,co:"Japan"},
  ],
  "Hyundai": [
    {m:"IONIQ 5 N",y:2023,pi:657,c:"A",sp:5.8,ha:4.4,ac:5.6,la:5.9,br:4.0,of:6.0,r:"RARE",v:22000,co:"Korea"},
    {m:"N Vision 74",y:2022,pi:692,c:"A",sp:5.4,ha:5.6,ac:4.8,la:5.0,br:4.8,of:4.8,r:"RARE",v:325000,co:"Korea"},
    {m:"i20 N",y:2021,pi:564,c:"B",sp:5.5,ha:5.1,ac:4.6,la:4.8,br:4.4,of:5.5,r:"RARE",v:48000,co:"Korea"},
    {m:"i30 N",y:2020,pi:553,c:"B",sp:5.3,ha:5.1,ac:4.6,la:4.8,br:4.3,of:5.3,r:"RARE",v:32000,co:"Korea"},
    {m:"Veloster N",y:2019,pi:532,c:"B",sp:6.0,ha:4.9,ac:4.5,la:4.7,br:3.7,of:5.5,r:"EPIC",v:20000,co:"Korea"},
  ],
  "Jaguar": [
    {m:"C-X75",y:2010,pi:810,c:"S2",sp:8.1,ha:6.9,ac:9.4,la:10.0,br:7.8,of:4.7,r:"LEGENDARY",v:3200000,co:"United Kingdom"},
    {m:"XJ220",y:1993,pi:676,c:"A",sp:7.7,ha:5.7,ac:5.2,la:2.2,br:5.2,of:5.4,r:"LEGENDARY",v:570000,co:"United Kingdom"},
    {m:"XJ220S TWR",y:1993,pi:750,c:"S1",sp:8.2,ha:6.1,ac:5.4,la:2.5,br:5.9,of:5.2,r:"RARE",v:540000,co:"United Kingdom"},
    {m:"Sport XJR-15",y:1991,pi:716,c:"S1",sp:7.5,ha:6.9,ac:6.0,la:6.3,br:6.4,of:5.2,r:"LEGENDARY",v:950000,co:"United Kingdom"},
    {m:"Lightweight E-Type",y:1964,pi:568,c:"B",sp:6.3,ha:3.9,ac:4.7,la:4.4,br:3.4,of:5.0,r:"LEGENDARY",v:7900000,co:"United Kingdom"},
    {m:"E-type",y:1961,pi:414,c:"C",sp:5.2,ha:3.8,ac:4.0,la:2.8,br:2.7,of:5.5,r:"EPIC",v:250000,co:"United Kingdom"},
    {m:"D-Type",y:1956,pi:506,c:"B",sp:5.6,ha:3.5,ac:3.8,la:2.6,br:2.8,of:4.7,r:"LEGENDARY",v:4300000,co:"United Kingdom"},
  ],
  "Jeep": [
    {m:"JT",y:2020,pi:336,c:"D",sp:4.8,ha:2.7,ac:3.6,la:3.2,br:2.5,of:8.7,r:"COMMON",v:36000,co:"United States"},
    {m:"Grand Cherokee Trackhawk",y:2018,pi:631,c:"A",sp:6.9,ha:4.4,ac:8.5,la:7.4,br:4.9,of:6.1,r:"COMMON",v:72000,co:"United States"},
    {m:"Trailcat",y:2016,pi:635,c:"A",sp:6.2,ha:3.8,ac:5.5,la:4.1,br:4.0,of:10.0,r:"RARE",v:70000,co:"United States"},
    {m:"Wrangler Rubicon",y:2012,pi:350,c:"D",sp:4.6,ha:2.7,ac:4.0,la:3.2,br:2.4,of:8.3,r:"COMMON",v:16000,co:"United States"},
  ],
  "Jimco": [
    {m:"179 Hammerhead Class 1",y:2020,pi:652,c:"A",sp:5.7,ha:2.4,ac:6.3,la:6.3,br:4.5,of:8.8,r:"RARE",v:95000,co:"United States"},
    {m:"240 Fastball Spec Trophy Truck",y:2019,pi:511,c:"B",sp:4.5,ha:2.9,ac:3.8,la:2.9,br:5.2,of:9.3,r:"EPIC",v:350000,co:"United States"},
  ],
  "KTM": [
    {m:"X-Bow GT4",y:2018,pi:749,c:"S1",sp:5.4,ha:8.1,ac:5.4,la:2.8,br:10.0,of:5.0,r:"EPIC",v:90000,co:"Austria"},
  ],
  "Koenigsegg": [
    {m:"Jesko",y:2020,pi:899,c:"S2",sp:10.0,ha:9.1,ac:6.5,la:7.0,br:8.9,of:5.0,r:"LEGENDARY",v:3500000,co:"Sweden"},
    {m:"Agera RS",y:2017,pi:890,c:"S2",sp:10.0,ha:8.1,ac:6.6,la:7.1,br:9.2,of:4.8,r:"LEGENDARY",v:2900000,co:"Sweden"},
    {m:"Regera",y:2016,pi:886,c:"S2",sp:9.1,ha:7.1,ac:5.0,la:5.2,br:8.8,of:4.9,r:"LEGENDARY",v:2550000,co:"Sweden"},
    {m:"One:1",y:2015,pi:890,c:"S2",sp:10.0,ha:8.0,ac:6.6,la:7.1,br:9.5,of:4.9,r:"LEGENDARY",v:3750000,co:"Sweden"},
    {m:"Agera",y:2011,pi:810,c:"S2",sp:9.8,ha:6.5,ac:6.1,la:6.5,br:7.4,of:4.9,r:"LEGENDARY",v:1950000,co:"Sweden"},
    {m:"CCGT",y:2008,pi:900,c:"S2",sp:7.9,ha:9.5,ac:6.8,la:7.3,br:10.0,of:4.4,r:"LEGENDARY",v:3400000,co:"Sweden"},
  ],
  "Lamborghini": [
    {m:"Revuelto",y:2024,pi:829,c:"S2",sp:8.6,ha:7.2,ac:9.9,la:10.0,br:7.7,of:4.9,r:"LEGENDARY",v:365000,co:"Italy"},
    {m:"Huracan Sterrato",y:2023,pi:738,c:"S1",sp:7.6,ha:5.7,ac:9.1,la:7.5,br:6.2,of:7.9,r:"LEGENDARY",v:325000,co:"Italy"},
    {m:"Huracan Tecnica",y:2022,pi:747,c:"S1",sp:7.3,ha:6.8,ac:6.6,la:7.2,br:7.4,of:4.8,r:"LEGENDARY",v:365000,co:"Italy"},
    {m:"Aventador LP 780-4 Ultimae",y:2021,pi:794,c:"S1",sp:7.3,ha:7.1,ac:9.9,la:9.5,br:7.8,of:5.0,r:"LEGENDARY",v:800000,co:"Italy"},
    {m:"Countach LPI 800-4",y:2021,pi:773,c:"S1",sp:7.8,ha:7.0,ac:9.1,la:8.4,br:7.4,of:5.2,r:"LEGENDARY",v:2100000,co:"Italy"},
    {m:"Essenza SCV12",y:2020,pi:911,c:"R",sp:8.1,ha:9.7,ac:7.0,la:7.4,br:10.0,of:5.2,r:"LEGENDARY",v:1500000,co:"Italy"},
    {m:"Huracan EVO",y:2020,pi:761,c:"S1",sp:7.3,ha:6.9,ac:9.3,la:10.0,br:7.2,of:5.1,r:"EPIC",v:250000,co:"Italy"},
    {m:"Huracan STO",y:2020,pi:783,c:"S1",sp:7.2,ha:7.9,ac:7.1,la:7.8,br:8.7,of:5.0,r:"LEGENDARY",v:325000,co:"Italy"},
    {m:"Sian Roadster",y:2020,pi:797,c:"S1",sp:8.8,ha:7.3,ac:8.3,la:8.1,br:8.0,of:5.1,r:"LEGENDARY",v:2500000,co:"Italy"},
    {m:"Urus",y:2019,pi:659,c:"A",sp:7.1,ha:5.1,ac:6.1,la:5.1,br:6.2,of:6.6,r:"RARE",v:200000,co:"Italy"},
    {m:"Aventador SVJ",y:2018,pi:794,c:"S1",sp:8.1,ha:7.5,ac:8.3,la:7.6,br:7.9,of:5.2,r:"LEGENDARY",v:1200000,co:"Italy"},
    {m:"Centenario LP 770-4",y:2016,pi:792,c:"S1",sp:8.3,ha:7.7,ac:8.7,la:8.0,br:8.6,of:5.2,r:"LEGENDARY",v:1750000,co:"Italy"},
    {m:"Huracan LP 610-4",y:2014,pi:738,c:"S1",sp:7.8,ha:6.5,ac:7.8,la:7.4,br:7.0,of:5.4,r:"EPIC",v:200000,co:"Italy"},
    {m:"Veneno",y:2013,pi:834,c:"S2",sp:8.2,ha:8.5,ac:8.9,la:8.1,br:9.7,of:5.1,r:"LEGENDARY",v:3950000,co:"Italy"},
    {m:"Aventador LP700-4",y:2012,pi:753,c:"S1",sp:8.9,ha:6.3,ac:8.2,la:7.4,br:7.3,of:5.6,r:"EPIC",v:345000,co:"Italy"},
    {m:"Gallardo LP570-4 Spyder Performante",y:2012,pi:685,c:"A",sp:7.1,ha:6.0,ac:6.6,la:5.0,br:6.6,of:5.7,r:"EPIC",v:210000,co:"Italy"},
    {m:"Sesto Elemento",y:2011,pi:871,c:"S2",sp:7.8,ha:9.7,ac:10.0,la:8.9,br:10.0,of:5.7,r:"LEGENDARY",v:2500000,co:"Italy"},
    {m:"Murcielago LP 670-4 SV",y:2010,pi:707,c:"S1",sp:7.8,ha:6.3,ac:5.2,la:4.5,br:6.8,of:5.6,r:"EPIC",v:1000000,co:"Italy"},
    {m:"Diablo GTR",y:1999,pi:823,c:"S2",sp:8.0,ha:8.1,ac:7.3,la:6.4,br:7.9,of:4.6,r:"EPIC",v:680000,co:"Italy"},
    {m:"Diablo SV",y:1997,pi:649,c:"A",sp:7.7,ha:5.5,ac:5.2,la:4.2,br:4.9,of:5.1,r:"BARN",v:375000,co:"Italy"},
    {m:"Countach LP5000 QV",y:1988,pi:622,c:"A",sp:6.8,ha:5.6,ac:4.7,la:3.6,br:4.3,of:5.3,r:"EPIC",v:600000,co:"Italy"},
    {m:"Miura P400",y:1967,pi:505,c:"B",sp:5.9,ha:4.6,ac:3.8,la:2.7,br:3.1,of:5.4,r:"LEGENDARY",v:1700000,co:"Italy"},
  ],
  "Lancia": [
    {m:"Delta HF Integrale Evo",y:1992,pi:489,c:"C",sp:4.9,ha:4.6,ac:4.5,la:2.3,br:3.6,of:6.0,r:"COMMON",v:110000,co:"Italy"},
    {m:"Delta S4",y:1986,pi:564,c:"B",sp:5.0,ha:4.9,ac:5.5,la:5.5,br:3.7,of:7.6,r:"RARE",v:55000,co:"Italy"},
    {m:"Stratos HF Stradale",y:1974,pi:483,c:"C",sp:5.3,ha:4.5,ac:4.8,la:4.3,br:3.1,of:6.0,r:"TREASURE",v:680000,co:"Italy"},
  ],
  "Land Rover": [
    {m:"Defender 110 X",y:2020,pi:427,c:"C",sp:5.4,ha:2.6,ac:4.7,la:6.0,br:2.9,of:7.7,r:"COMMON",v:250000,co:"United Kingdom"},
    {m:"Range Rover Sport SVR",y:2015,pi:604,c:"A",sp:6.5,ha:3.6,ac:6.0,la:6.2,br:4.1,of:7.5,r:"RARE",v:48000,co:"United Kingdom"},
  ],
  "Lexus": [
    {m:"LC 500",y:2021,pi:592,c:"B",sp:7.0,ha:5.3,ac:4.8,la:5.0,br:4.4,of:5.2,r:"RARE",v:79000,co:"United States"},
    {m:"RC F",y:2015,pi:623,c:"A",sp:6.7,ha:5.3,ac:5.0,la:5.2,br:5.2,of:5.3,r:"RARE",v:35000,co:"United States"},
    {m:"LFA",y:2010,pi:699,c:"A",sp:7.4,ha:6.0,ac:5.8,la:6.0,br:7.0,of:5.0,r:"EPIC",v:875000,co:"United States"},
    {m:"LFA Forza Edition",y:2010,pi:900,c:"S2",sp:8.2,ha:9.6,ac:7.4,la:8.0,br:10.0,of:4.4,r:"FORZA",v:1250000,co:"United States"},
  ],
  "Lincoln": [
    {m:"Continental",y:1962,pi:267,c:"D",sp:5.3,ha:3.6,ac:2.6,la:1.7,br:1.9,of:6.0,r:"BARN",v:65000,co:"United States"},
  ],
  "Lotus": [
    {m:"Emira",y:2023,pi:656,c:"A",sp:6.4,ha:6.7,ac:6.3,la:5.1,br:5.6,of:5.2,r:"RARE",v:250000,co:"United Kingdom"},
    {m:"Evija",y:2020,pi:937,c:"R",sp:7.6,ha:7.2,ac:6.8,la:7.5,br:10.0,of:4.5,r:"LEGENDARY",v:2450000,co:"United Kingdom"},
    {m:"Evija Forza Edition",y:2020,pi:900,c:"S2",sp:7.9,ha:6.1,ac:5.6,la:6.0,br:7.9,of:4.2,r:"FORZA",v:500000,co:"United Kingdom"},
    {m:"Exige Cup 430",y:2018,pi:732,c:"S1",sp:6.7,ha:7.3,ac:7.7,la:8.5,br:6.8,of:4.8,r:"EPIC",v:250000,co:"United Kingdom"},
    {m:"Scura Motorsports Exige WTAC",y:2018,pi:998,c:"R",sp:6.6,ha:9.2,ac:7.7,la:5.5,br:10.0,of:4.3,r:"LEGENDARY",v:400000,co:"United Kingdom"},
    {m:"Elise Series 1 Sport 190",y:1999,pi:589,c:"B",sp:5.3,ha:5.4,ac:5.8,la:4.8,br:5.1,of:5.2,r:"COMMON",v:47000,co:"United Kingdom"},
    {m:"Elise GT1",y:1997,pi:709,c:"S1",sp:6.8,ha:7.2,ac:6.5,la:3.2,br:7.0,of:5.2,r:"LEGENDARY",v:1500000,co:"United Kingdom"},
  ],
  "Lucid": [
    {m:"Air Sapphire",y:2024,pi:820,c:"S2",sp:7.2,ha:5.4,ac:9.1,la:10.0,br:6.2,of:4.9,r:"RARE",v:240000,co:"United States"},
  ],
  "MG": [
    {m:"Metro 6R4",y:1986,pi:627,c:"A",sp:4.2,ha:5.7,ac:6.8,la:6.9,br:5.8,of:8.9,r:"LEGENDARY",v:220000,co:"United Kingdom"},
  ],
  "MINI": [
    {m:"John Cooper Works GP",y:2021,pi:599,c:"B",sp:5.9,ha:5.4,ac:4.7,la:4.9,br:4.6,of:4.9,r:"RARE",v:250000,co:"United Kingdom"},
    {m:"X-Raid John Cooper Works Buggy",y:2018,pi:514,c:"B",sp:4.5,ha:3.6,ac:4.0,la:3.1,br:4.9,of:10.0,r:"EPIC",v:425000,co:"United Kingdom"},
    {m:"X-Raid All4 Racing Countryman",y:2013,pi:523,c:"B",sp:3.3,ha:4.5,ac:5.2,la:8.4,br:4.1,of:8.4,r:"EPIC",v:220000,co:"United Kingdom"},
    {m:"John Cooper Works GP",y:2012,pi:509,c:"B",sp:5.4,ha:4.5,ac:4.2,la:4.3,br:3.7,of:4.9,r:"RARE",v:30000,co:"United Kingdom"},
    {m:"Cooper S",y:1965,pi:158,c:"D",sp:3.6,ha:3.0,ac:2.6,la:2.7,br:2.0,of:4.3,r:"RARE",v:39000,co:"United Kingdom"},
  ],
  "Maserati": [
    {m:"MC20",y:2022,pi:753,c:"S1",sp:7.9,ha:6.5,ac:6.6,la:7.2,br:7.0,of:4.8,r:"EPIC",v:220000,co:"Italy"},
    {m:"MC12 Versione Corsa",y:2008,pi:912,c:"R",sp:7.8,ha:9.5,ac:8.0,la:8.8,br:10.0,of:4.5,r:"LEGENDARY",v:3100000,co:"Italy"},
    {m:"MC12",y:2004,pi:751,c:"S1",sp:8.4,ha:6.5,ac:6.6,la:7.2,br:6.6,of:5.2,r:"EPIC",v:3750000,co:"Italy"},
    {m:"Ghibli Cup",y:1997,pi:591,c:"B",sp:6.5,ha:5.0,ac:5.0,la:4.2,br:4.3,of:4.9,r:"RARE",v:102000,co:"Italy"},
  ],
  "Mazda": [
    {m:"MX-5 Miata RF",y:2022,pi:509,c:"B",sp:5.3,ha:5.0,ac:4.8,la:4.8,br:3.8,of:5.4,r:"EPIC",v:29000,co:"Japan"},
    {m:"MX-5 Cup",y:2017,pi:586,c:"B",sp:5.2,ha:6.3,ac:3.0,la:2.7,br:4.5,of:4.9,r:"EPIC",v:60000,co:"Japan"},
    {m:"MX-5",y:2016,pi:499,c:"C",sp:5.4,ha:5.1,ac:4.6,la:4.7,br:3.7,of:5.4,r:"EPIC",v:18000,co:"Japan"},
    {m:"MX-5",y:2013,pi:432,c:"C",sp:4.8,ha:4.9,ac:3.9,la:3.4,br:3.4,of:5.5,r:"COMMON",v:28000,co:"Japan"},
    {m:"RX-8 R3",y:2011,pi:508,c:"B",sp:5.8,ha:5.0,ac:4.6,la:3.8,br:3.7,of:5.5,r:"RARE",v:33000,co:"Japan"},
    {m:"Mazdaspeed 3",y:2010,pi:536,c:"B",sp:6.2,ha:4.6,ac:4.2,la:4.2,br:3.5,of:5.4,r:"COMMON",v:25000,co:"Japan"},
    {m:"Furai",y:2008,pi:926,c:"R",sp:6.8,ha:9.6,ac:7.6,la:7.7,br:10.0,of:4.7,r:"LEGENDARY",v:353000,co:"Japan"},
    {m:"Mazdaspeed MX-5",y:2005,pi:469,c:"C",sp:5.1,ha:4.9,ac:3.4,la:3.8,br:3.5,of:5.1,r:"COMMON",v:21000,co:"Japan"},
    {m:"MX-5 Miata",y:1994,pi:329,c:"D",sp:4.5,ha:4.2,ac:3.4,la:2.3,br:2.5,of:5.2,r:"COMMON",v:15000,co:"Japan"},
    {m:"MX-5 Miata Forza Edition",y:1994,pi:850,c:"S2",sp:9.4,ha:6.9,ac:10.0,la:4.8,br:6.7,of:4.4,r:"FORZA",v:500000,co:"Japan"},
    {m:"RX-7 Type R",y:1992,pi:548,c:"B",sp:6.6,ha:4.8,ac:4.8,la:4.1,br:3.4,of:5.2,r:"RARE",v:40000,co:"Japan"},
    {m:"55 Mazda 787B",y:1991,pi:988,c:"R",sp:8.0,ha:9.6,ac:7.9,la:8.6,br:10.0,of:4.7,r:"BARN",v:1220000,co:"Japan"},
    {m:"Savanna RX-7",y:1990,pi:451,c:"C",sp:5.7,ha:4.5,ac:4.3,la:3.3,br:3.1,of:5.4,r:"EPIC",v:23000,co:"Japan"},
    {m:"RX-7 GSL-SE",y:1985,pi:357,c:"D",sp:4.8,ha:4.4,ac:3.4,la:3.7,br:2.8,of:5.4,r:"TREASURE",v:30000,co:"Japan"},
    {m:"RX-3",y:1973,pi:328,c:"D",sp:4.3,ha:4.1,ac:3.5,la:3.3,br:2.5,of:5.7,r:"COMMON",v:73000,co:"Japan"},
    {m:"RX-3 Forza Edition",y:1973,pi:600,c:"B",sp:5.9,ha:4.9,ac:4.8,la:5.0,br:4.2,of:4.9,r:"FORZA",v:500000,co:"Japan"},
    {m:"Cosmo 110S Series II",y:1972,pi:394,c:"D",sp:5.0,ha:3.9,ac:4.0,la:2.9,br:2.8,of:5.6,r:"EPIC",v:250000,co:"Japan"},
  ],
  "McLaren": [
    {m:"Artura",y:2023,pi:766,c:"S1",sp:8.1,ha:6.3,ac:6.7,la:7.3,br:7.2,of:4.9,r:"EPIC",v:220000,co:"United Kingdom"},
    {m:"620R",y:2021,pi:773,c:"S1",sp:6.8,ha:7.1,ac:6.7,la:4.4,br:8.4,of:5.1,r:"EPIC",v:260000,co:"United Kingdom"},
    {m:"765LT Coupe",y:2021,pi:829,c:"S2",sp:8.1,ha:7.0,ac:7.1,la:7.7,br:8.9,of:4.9,r:"EPIC",v:358000,co:"United Kingdom"},
    {m:"Sabre",y:2021,pi:787,c:"S1",sp:8.1,ha:7.0,ac:6.9,la:4.1,br:7.7,of:4.6,r:"EPIC",v:3400000,co:"United Kingdom"},
    {m:"Speedtail",y:2019,pi:835,c:"S2",sp:9.7,ha:6.5,ac:6.8,la:7.4,br:7.2,of:4.3,r:"LEGENDARY",v:2000000,co:"United Kingdom"},
    {m:"600LT Coupe",y:2018,pi:780,c:"S1",sp:7.4,ha:7.0,ac:6.7,la:4.6,br:7.6,of:4.7,r:"EPIC",v:260000,co:"United Kingdom"},
    {m:"570S Coupe",y:2015,pi:721,c:"S1",sp:7.3,ha:6.1,ac:6.3,la:4.4,br:6.9,of:4.9,r:"EPIC",v:130000,co:"United Kingdom"},
    {m:"650S Spider",y:2014,pi:765,c:"S1",sp:7.4,ha:6.3,ac:6.7,la:4.8,br:7.8,of:5.1,r:"EPIC",v:130000,co:"United Kingdom"},
    {m:"P1",y:2013,pi:848,c:"S2",sp:9.1,ha:7.4,ac:6.9,la:7.4,br:9.2,of:4.9,r:"LEGENDARY",v:1550000,co:"United Kingdom"},
    {m:"12C Coupe",y:2011,pi:727,c:"S1",sp:7.6,ha:6.0,ac:6.3,la:6.9,br:6.2,of:5.1,r:"EPIC",v:105000,co:"United Kingdom"},
    {m:"F1 GT",y:1997,pi:769,c:"S1",sp:8.6,ha:7.2,ac:6.5,la:6.1,br:6.6,of:4.8,r:"LEGENDARY",v:5500000,co:"United Kingdom"},
    {m:"F1",y:1993,pi:713,c:"S1",sp:8.8,ha:5.8,ac:6.3,la:5.8,br:5.4,of:5.0,r:"LEGENDARY",v:5000000,co:"United Kingdom"},
  ],
  "Mercedes-AMG": [
    {m:"GT Black Series",y:2021,pi:782,c:"S1",sp:7.4,ha:7.1,ac:6.5,la:6.2,br:8.4,of:4.7,r:"EPIC",v:440000,co:"Germany"},
    {m:"ONE",y:2021,pi:900,c:"S2",sp:8.5,ha:8.7,ac:10.0,la:9.4,br:9.6,of:5.3,r:"LEGENDARY",v:2800000,co:"Germany"},
    {m:"SL 63",y:2021,pi:690,c:"A",sp:7.4,ha:5.5,ac:8.7,la:9.8,br:4.8,of:5.3,r:"RARE",v:120000,co:"Germany"},
    {m:"GT Black Series Welcome Pack",y:2020,pi:900,c:"S2",sp:7.4,ha:8.9,ac:7.8,la:8.6,br:10.0,of:4.7,r:"LEGENDARY",v:200000,co:"Germany"},
    {m:"SLC 43 Final Edition",y:2020,pi:620,c:"A",sp:6.9,ha:5.3,ac:5.1,la:5.4,br:4.5,of:5.0,r:"RARE",v:50000,co:"Germany"},
    {m:"E 63 S",y:2018,pi:674,c:"A",sp:7.6,ha:5.5,ac:8.7,la:9.7,br:4.8,of:5.5,r:"EPIC",v:63000,co:"Germany"},
    {m:"GT 4-Door Coupe",y:2018,pi:664,c:"A",sp:8.0,ha:5.3,ac:8.4,la:9.4,br:4.5,of:5.5,r:"EPIC",v:250000,co:"Germany"},
    {m:"GT R",y:2017,pi:764,c:"S1",sp:7.7,ha:6.4,ac:6.8,la:7.4,br:7.3,of:4.9,r:"EPIC",v:250000,co:"Germany"},
    {m:"C 63 S Coupe",y:2016,pi:645,c:"A",sp:7.0,ha:5.3,ac:5.2,la:5.5,br:5.6,of:5.1,r:"RARE",v:34000,co:"Germany"},
    {m:"GT S",y:2015,pi:691,c:"A",sp:7.0,ha:6.0,ac:6.2,la:6.6,br:7.0,of:5.4,r:"RARE",v:90000,co:"Germany"},
  ],
  "Mercedes-Benz": [
    {m:"X-Class",y:2018,pi:258,c:"D",sp:4.2,ha:2.9,ac:2.4,la:4.2,br:2.8,of:8.1,r:"COMMON",v:50000,co:"Germany"},
    {m:"G 63 AMG 6x6",y:2014,pi:489,c:"C",sp:5.6,ha:3.4,ac:4.0,la:6.6,br:4.1,of:9.5,r:"EPIC",v:780000,co:"Germany"},
    {m:"Unimog U5023",y:2014,pi:100,c:"D",sp:2.8,ha:3.0,ac:1.3,la:3.0,br:2.7,of:9.0,r:"RARE",v:235000,co:"Germany"},
    {m:"A 45 AMG",y:2013,pi:582,c:"B",sp:6.7,ha:5.7,ac:6.6,la:4.5,br:4.4,of:5.5,r:"RARE",v:25000,co:"Germany"},
    {m:"G 65 AMG",y:2013,pi:530,c:"B",sp:5.9,ha:2.9,ac:6.6,la:8.0,br:3.2,of:8.2,r:"RARE",v:120000,co:"Germany"},
    {m:"C 63 AMG Coupe Black Series",y:2012,pi:654,c:"A",sp:7.1,ha:5.6,ac:5.1,la:5.3,br:5.2,of:5.1,r:"EPIC",v:175000,co:"Germany"},
    {m:"SL 65 AMG Black Series",y:2009,pi:699,c:"A",sp:7.9,ha:5.6,ac:5.3,la:4.8,br:5.2,of:4.9,r:"EPIC",v:360000,co:"Germany"},
    {m:"AMG CLK GTR",y:1998,pi:713,c:"S1",sp:7.6,ha:6.6,ac:6.1,la:5.1,br:6.3,of:4.8,r:"LEGENDARY",v:3600000,co:"Germany"},
    {m:"190E Evolution II",y:1990,pi:460,c:"C",sp:6.2,ha:4.4,ac:4.0,la:3.6,br:2.9,of:4.8,r:"EPIC",v:200000,co:"Germany"},
    {m:"190E Evolution II Forza Edition",y:1990,pi:700,c:"A",sp:6.3,ha:7.3,ac:4.8,la:3.8,br:6.3,of:5.0,r:"FORZA",v:750000,co:"Germany"},
    {m:"AMG Hammer Coupe",y:1987,pi:565,c:"B",sp:7.2,ha:5.0,ac:4.2,la:3.0,br:3.8,of:5.2,r:"COMMON",v:225000,co:"Germany"},
    {m:"300 SLR",y:1955,pi:599,c:"B",sp:6.9,ha:4.2,ac:5.0,la:3.9,br:3.1,of:5.2,r:"LEGENDARY",v:60000000,co:"Germany"},
    {m:"300 SL Coupe",y:1954,pi:388,c:"D",sp:5.1,ha:3.9,ac:3.6,la:2.3,br:2.4,of:5.8,r:"LEGENDARY",v:1700000,co:"Germany"},
  ],
  "Meyers": [
    {m:"Manx 2.0",y:2023,pi:540,c:"B",sp:4.5,ha:4.3,ac:6.0,la:6.6,br:3.6,of:6.3,r:"EPIC",v:74000,co:"United States"},
    {m:"Manx",y:1971,pi:201,c:"D",sp:3.1,ha:3.9,ac:2.9,la:5.3,br:2.6,of:6.2,r:"EPIC",v:34000,co:"United States"},
  ],
  "Mitsubishi": [
    {m:"Lancer Evolution X GSR",y:2008,pi:534,c:"B",sp:5.7,ha:5.1,ac:5.1,la:2.9,br:3.7,of:6.0,r:"RARE",v:25000,co:"Japan"},
    {m:"Lancer Evolution IX MR",y:2006,pi:521,c:"B",sp:5.9,ha:5.1,ac:4.7,la:2.4,br:3.6,of:5.9,r:"EPIC",v:250000,co:"Japan"},
    {m:"1 Sierra Lancer Evolution Time Attack",y:2005,pi:962,c:"R",sp:6.5,ha:9.1,ac:10.0,la:3.0,br:10.0,of:4.6,r:"BARN",v:90000,co:"Japan"},
    {m:"Lancer Evolution VIII MR",y:2004,pi:555,c:"B",sp:6.2,ha:5.0,ac:5.7,la:3.1,br:3.6,of:6.0,r:"RARE",v:30000,co:"Japan"},
    {m:"Lancer Evolution VIII MR Welcome Pack",y:2004,pi:700,c:"A",sp:6.9,ha:6.5,ac:7.7,la:4.1,br:5.1,of:6.9,r:"LEGENDARY",v:100000,co:"Japan"},
    {m:"Lancer Evolution VI GSR TM Edition",y:2001,pi:574,c:"B",sp:5.3,ha:5.1,ac:6.4,la:4.3,br:4.2,of:5.7,r:"RARE",v:70000,co:"Japan"},
    {m:"GTO",y:1997,pi:495,c:"C",sp:6.1,ha:4.8,ac:4.5,la:3.6,br:3.4,of:5.8,r:"COMMON",v:20000,co:"Japan"},
    {m:"Montero Evolution",y:1997,pi:346,c:"D",sp:4.6,ha:2.6,ac:3.6,la:3.3,br:2.5,of:8.0,r:"BARN",v:50000,co:"Japan"},
    {m:"Eclipse GSX",y:1995,pi:436,c:"C",sp:5.9,ha:4.3,ac:3.9,la:3.2,br:2.8,of:5.8,r:"COMMON",v:35000,co:"Japan"},
    {m:"Lancer Evolution III GSR",y:1995,pi:517,c:"B",sp:5.7,ha:4.9,ac:5.9,la:4.9,br:3.5,of:5.9,r:"TREASURE",v:29000,co:"Japan"},
    {m:"Montero Exceed 2800 TD",y:1995,pi:190,c:"D",sp:3.5,ha:2.9,ac:2.1,la:2.9,br:2.8,of:8.2,r:"RARE",v:25000,co:"Japan"},
    {m:"Galant VR-4",y:1992,pi:432,c:"C",sp:5.4,ha:4.5,ac:4.6,la:3.1,br:2.8,of:5.7,r:"RARE",v:25000,co:"Japan"},
    {m:"269 Minicab Time Attack",y:1990,pi:166,c:"D",sp:2.3,ha:6.9,ac:1.9,la:4.5,br:9.2,of:5.2,r:"EPIC",v:100000,co:"Japan"},
  ],
  "Nissan": [
    {m:"GT-R NISMO",y:2024,pi:741,c:"S1",sp:7.6,ha:7.1,ac:9.2,la:7.4,br:7.3,of:5.4,r:"EPIC",v:220000,co:"Japan"},
    {m:"Z NISMO",y:2024,pi:652,c:"A",sp:6.6,ha:5.6,ac:5.3,la:5.6,br:4.8,of:5.2,r:"EPIC",v:60000,co:"Japan"},
    {m:"GT-R NISMO R35",y:2020,pi:736,c:"S1",sp:7.5,ha:6.7,ac:8.9,la:7.2,br:6.8,of:5.1,r:"EPIC",v:270000,co:"Japan"},
    {m:"370Z Nismo",y:2019,pi:603,c:"A",sp:6.6,ha:5.7,ac:5.3,la:4.8,br:4.5,of:5.4,r:"RARE",v:46000,co:"Japan"},
    {m:"GT-R R35",y:2017,pi:709,c:"S1",sp:7.5,ha:5.9,ac:8.7,la:7.8,br:5.3,of:5.5,r:"RARE",v:115000,co:"Japan"},
    {m:"GT-R Black Edition R35",y:2012,pi:703,c:"S1",sp:7.6,ha:6.1,ac:8.5,la:8.1,br:5.3,of:5.6,r:"RARE",v:80000,co:"Japan"},
    {m:"GT-R Black Edition R35 Forza Edition",y:2012,pi:850,c:"S2",sp:10.0,ha:6.6,ac:10.0,la:10.0,br:8.1,of:5.6,r:"FORZA",v:750000,co:"Japan"},
    {m:"370Z",y:2010,pi:568,c:"B",sp:6.6,ha:5.1,ac:4.8,la:4.6,br:3.9,of:5.3,r:"COMMON",v:250000,co:"Japan"},
    {m:"Fairlady Z",y:2003,pi:534,c:"B",sp:6.5,ha:5.0,ac:4.6,la:4.0,br:3.5,of:5.2,r:"COMMON",v:18000,co:"Japan"},
    {m:"Silvia Spec-R",y:2002,pi:551,c:"B",sp:6.3,ha:5.0,ac:4.8,la:3.0,br:3.8,of:5.3,r:"COMMON",v:44000,co:"Japan"},
    {m:"36 Dream Project S15 Silvia WTAC",y:2000,pi:996,c:"R",sp:6.7,ha:9.3,ac:7.7,la:4.6,br:10.0,of:4.4,r:"EPIC",v:400000,co:"Japan"},
    {m:"Skyline GT-R V-Spec II",y:2000,pi:590,c:"B",sp:6.4,ha:5.2,ac:6.5,la:3.9,br:3.8,of:5.8,r:"RARE",v:200000,co:"Japan"},
    {m:"23 Pennzoil NISMO Skyline GT-R",y:1998,pi:848,c:"S2",sp:6.5,ha:8.4,ac:6.4,la:2.1,br:9.5,of:4.5,r:"BARN",v:600000,co:"Japan"},
    {m:"R390 GT1",y:1998,pi:774,c:"S1",sp:7.1,ha:6.6,ac:6.2,la:3.1,br:6.6,of:3.9,r:"BARN",v:1000000,co:"Japan"},
    {m:"Silvia Ks Aero",y:1998,pi:494,c:"C",sp:5.7,ha:4.8,ac:4.4,la:2.5,br:3.4,of:5.6,r:"COMMON",v:22000,co:"Japan"},
    {m:"Skyline GT-R V-Spec",y:1997,pi:555,c:"B",sp:6.4,ha:4.9,ac:5.6,la:3.1,br:3.6,of:5.9,r:"RARE",v:250000,co:"Japan"},
    {m:"Stagea RS FOUR V",y:1997,pi:439,c:"C",sp:5.4,ha:5.0,ac:3.4,la:1.7,br:3.1,of:6.3,r:"EPIC",v:20000,co:"Japan"},
    {m:"Gloria Gran Turismo",y:1995,pi:498,c:"C",sp:6.0,ha:4.6,ac:4.3,la:2.5,br:3.1,of:5.7,r:"RARE",v:15000,co:"Japan"},
    {m:"NISMO GT-R LM",y:1995,pi:544,c:"B",sp:5.9,ha:5.8,ac:4.5,la:2.1,br:4.0,of:4.7,r:"LEGENDARY",v:1100000,co:"Japan"},
    {m:"Fairlady Z Version S Twin Turbo",y:1994,pi:497,c:"C",sp:6.0,ha:4.8,ac:4.3,la:2.7,br:3.2,of:5.2,r:"EPIC",v:40000,co:"Japan"},
    {m:"Silvia Ks",y:1994,pi:499,c:"C",sp:5.8,ha:4.9,ac:4.4,la:2.7,br:3.4,of:5.5,r:"COMMON",v:20000,co:"Japan"},
    {m:"240SX",y:1993,pi:339,c:"D",sp:5.1,ha:4.2,ac:3.3,la:2.5,br:2.5,of:5.6,r:"EPIC",v:250000,co:"Japan"},
    {m:"32 Skyline WTAC Xtreme GTR",y:1993,pi:923,c:"R",sp:6.8,ha:9.6,ac:7.8,la:2.1,br:10.0,of:5.4,r:"EPIC",v:570000,co:"Japan"},
    {m:"Skyline GT-R",y:1992,pi:541,c:"B",sp:6.0,ha:5.1,ac:5.8,la:3.3,br:3.6,of:5.8,r:"RARE",v:72000,co:"Japan"},
    {m:"Figaro",y:1991,pi:234,c:"D",sp:3.4,ha:4.1,ac:2.6,la:1.0,br:2.9,of:6.0,r:"TREASURE",v:40000,co:"Japan"},
    {m:"Pulsar GTI-R",y:1990,pi:486,c:"C",sp:5.4,ha:4.4,ac:5.5,la:3.4,br:2.9,of:5.4,r:"RARE",v:28000,co:"Japan"},
    {m:"PAO",y:1989,pi:145,c:"D",sp:3.0,ha:4.7,ac:1.9,la:1.2,br:3.1,of:6.6,r:"BARN",v:12000,co:"Japan"},
    {m:"S-Cargo",y:1989,pi:131,c:"D",sp:3.1,ha:4.1,ac:2.0,la:1.2,br:2.8,of:6.0,r:"RARE",v:19000,co:"Japan"},
    {m:"S-Cargo Forza Edition",y:1989,pi:800,c:"S1",sp:7.6,ha:7.7,ac:4.7,la:4.8,br:6.8,of:5.2,r:"FORZA",v:500000,co:"Japan"},
    {m:"Silvia Ks",y:1989,pi:455,c:"C",sp:5.6,ha:4.2,ac:3.9,la:3.8,br:2.9,of:5.4,r:"COMMON",v:40000,co:"Japan"},
    {m:"Be-1",y:1987,pi:175,c:"D",sp:3.0,ha:4.3,ac:2.1,la:1.5,br:3.2,of:6.1,r:"EPIC",v:23000,co:"Japan"},
    {m:"Skyline GTS-R",y:1987,pi:432,c:"C",sp:5.7,ha:4.3,ac:4.0,la:2.5,br:2.7,of:5.2,r:"EPIC",v:41000,co:"Japan"},
    {m:"Safari Turbo",y:1985,pi:123,c:"D",sp:3.3,ha:2.9,ac:2.0,la:3.2,br:2.2,of:8.3,r:"TREASURE",v:25000,co:"Japan"},
    {m:"11 Tomica Skyline Turbo Super Silhouette",y:1983,pi:847,c:"S2",sp:6.7,ha:8.4,ac:7.1,la:2.7,br:9.1,of:4.4,r:"BARN",v:301000,co:"Japan"},
    {m:"Skyline HT 2000GT-R",y:1973,pi:407,c:"C",sp:4.7,ha:4.2,ac:3.4,la:2.2,br:3.0,of:6.0,r:"EPIC",v:416000,co:"Japan"},
    {m:"Skyline 2000GT-R",y:1971,pi:380,c:"D",sp:4.7,ha:4.0,ac:3.6,la:2.5,br:2.6,of:5.3,r:"BARN",v:169000,co:"Japan"},
    {m:"Fairlady Z 432",y:1969,pi:369,c:"D",sp:4.4,ha:4.4,ac:3.6,la:2.4,br:2.7,of:5.4,r:"EPIC",v:250000,co:"Japan"},
  ],
  "Noble": [
    {m:"M600",y:2010,pi:793,c:"S1",sp:8.5,ha:7.0,ac:7.4,la:7.8,br:6.1,of:5.1,r:"EPIC",v:322000,co:"United Kingdom"},
  ],
  "Opel": [
    {m:"Manta 400",y:1984,pi:576,c:"B",sp:5.8,ha:4.6,ac:4.6,la:4.8,br:3.7,of:6.8,r:"RARE",v:152000,co:"Germany"},
  ],
  "Pagani": [
    {m:"Huayra R",y:2021,pi:954,c:"R",sp:8.7,ha:9.5,ac:7.8,la:8.2,br:10.0,of:5.0,r:"LEGENDARY",v:2750000,co:"Italy"},
    {m:"Huayra BC Coupe",y:2016,pi:851,c:"S2",sp:8.4,ha:7.9,ac:7.0,la:7.6,br:9.5,of:4.6,r:"LEGENDARY",v:3600000,co:"Italy"},
    {m:"Zonda Cinque Roadster",y:2010,pi:812,c:"S2",sp:7.4,ha:6.8,ac:6.4,la:6.9,br:8.3,of:4.8,r:"LEGENDARY",v:4000000,co:"Italy"},
    {m:"Zonda R",y:2009,pi:918,c:"R",sp:8.0,ha:9.2,ac:7.6,la:8.2,br:10.0,of:4.2,r:"LEGENDARY",v:4750000,co:"Italy"},
  ],
  "Peel": [
    {m:"P50",y:1962,pi:100,c:"D",sp:1.1,ha:2.8,ac:1.0,la:2.4,br:5.2,of:4.8,r:"LEGENDARY",v:21000,co:"United Kingdom"},
  ],
  "Penhall": [
    {m:"The Cholla",y:2011,pi:541,c:"B",sp:4.1,ha:3.7,ac:5.7,la:4.8,br:4.3,of:9.8,r:"RARE",v:85000,co:"United States"},
  ],
  "Peugeot": [
    {m:"207 Super 2000",y:2007,pi:632,c:"A",sp:5.3,ha:5.8,ac:5.9,la:5.2,br:5.7,of:8.3,r:"EPIC",v:85000,co:"France"},
    {m:"205 Rallye",y:1991,pi:350,c:"D",sp:4.3,ha:4.0,ac:2.9,la:3.8,br:2.5,of:5.1,r:"RARE",v:22000,co:"France"},
    {m:"205 Turbo 16",y:1984,pi:500,c:"C",sp:5.0,ha:4.6,ac:4.4,la:1.6,br:3.6,of:7.4,r:"BARN",v:275000,co:"France"},
  ],
  "Plymouth": [
    {m:"Cuda 426 HEMI",y:1971,pi:441,c:"C",sp:5.6,ha:3.5,ac:3.4,la:3.3,br:2.4,of:5.4,r:"EPIC",v:125000,co:"United States"},
    {m:"Barracuda Formula S",y:1968,pi:445,c:"C",sp:5.2,ha:4.1,ac:3.8,la:3.4,br:2.9,of:6.5,r:"RARE",v:45000,co:"United States"},
    {m:"Fury",y:1958,pi:361,c:"D",sp:5.2,ha:3.5,ac:3.2,la:2.8,br:2.1,of:5.9,r:"RARE",v:53000,co:"United States"},
  ],
  "Polaris": [
    {m:"RZR Pro XP Factory Racing Limited Edition",y:2021,pi:439,c:"C",sp:3.3,ha:4.1,ac:3.4,la:3.5,br:5.1,of:10.0,r:"RARE",v:50000,co:"United States"},
    {m:"RZR Pro XP Ultimate",y:2021,pi:496,c:"C",sp:3.2,ha:3.4,ac:4.0,la:4.2,br:4.8,of:9.1,r:"RARE",v:34000,co:"United States"},
  ],
  "Pontiac": [
    {m:"Firebird Trans Am GTA",y:1987,pi:382,c:"D",sp:5.5,ha:3.8,ac:3.4,la:3.1,br:2.4,of:5.0,r:"COMMON",v:25000,co:"United States"},
    {m:"Firebird Trans Am",y:1977,pi:311,c:"D",sp:5.1,ha:3.7,ac:3.1,la:2.0,br:2.1,of:5.9,r:"RARE",v:60000,co:"United States"},
  ],
  "Porsche": [
    {m:"911 GT3 RS",y:2023,pi:758,c:"S1",sp:7.0,ha:8.0,ac:7.2,la:5.4,br:10.0,of:5.2,r:"EPIC",v:424000,co:"Germany"},
    {m:"911 Rallye",y:2023,pi:700,c:"A",sp:7.0,ha:5.7,ac:7.9,la:6.8,br:4.8,of:8.3,r:"EPIC",v:390000,co:"Germany"},
    {m:"911 Turbo S",y:2023,pi:774,c:"S1",sp:7.8,ha:6.3,ac:9.3,la:10.0,br:7.2,of:5.4,r:"RARE",v:275000,co:"Germany"},
    {m:"718 Cayman GT4 RS",y:2022,pi:737,c:"S1",sp:7.7,ha:7.2,ac:6.8,la:7.3,br:6.2,of:5.0,r:"EPIC",v:190000,co:"Germany"},
    {m:"Mission R",y:2022,pi:865,c:"S2",sp:6.3,ha:7.9,ac:6.1,la:6.7,br:8.8,of:5.1,r:"LEGENDARY",v:5000000,co:"Germany"},
    {m:"911 GT3",y:2021,pi:752,c:"S1",sp:7.4,ha:7.4,ac:7.4,la:6.1,br:7.9,of:5.1,r:"EPIC",v:260000,co:"Germany"},
    {m:"Taycan Turbo S",y:2020,pi:725,c:"S1",sp:6.1,ha:5.2,ac:8.5,la:9.6,br:6.0,of:4.9,r:"COMMON",v:200000,co:"Germany"},
    {m:"70 Porsche Motorsport 935",y:2019,pi:853,c:"S2",sp:7.7,ha:8.8,ac:8.3,la:9.1,br:9.6,of:4.8,r:"LEGENDARY",v:1600000,co:"Germany"},
    {m:"911 Carrera S",y:2019,pi:714,c:"S1",sp:7.4,ha:6.6,ac:6.4,la:6.9,br:7.6,of:5.0,r:"RARE",v:145000,co:"Germany"},
    {m:"911 GT3 RS",y:2019,pi:760,c:"S1",sp:7.2,ha:7.4,ac:7.4,la:7.6,br:8.0,of:5.0,r:"EPIC",v:250000,co:"Germany"},
    {m:"718 Cayman GTS",y:2018,pi:675,c:"A",sp:6.8,ha:6.5,ac:6.4,la:7.0,br:5.5,of:4.9,r:"EPIC",v:75000,co:"Germany"},
    {m:"911 GT2 RS",y:2018,pi:803,c:"S2",sp:7.5,ha:7.9,ac:7.6,la:8.3,br:8.9,of:5.1,r:"EPIC",v:550000,co:"Germany"},
    {m:"Cayenne Turbo",y:2018,pi:638,c:"A",sp:6.7,ha:4.8,ac:7.4,la:9.8,br:6.0,of:6.3,r:"EPIC",v:79000,co:"Germany"},
    {m:"Macan LPR Rally Raid",y:2018,pi:528,c:"B",sp:5.1,ha:3.8,ac:4.7,la:4.6,br:4.7,of:10.0,r:"EPIC",v:250000,co:"Germany"},
    {m:"918 Spyder",y:2014,pi:858,c:"S2",sp:8.8,ha:7.8,ac:10.0,la:10.0,br:9.0,of:5.1,r:"LEGENDARY",v:2300000,co:"Germany"},
    {m:"911 GT3 RS 4.0",y:2012,pi:726,c:"S1",sp:7.4,ha:7.1,ac:7.6,la:7.1,br:7.3,of:5.0,r:"EPIC",v:930000,co:"Germany"},
    {m:"Cayman GT3 WTAC",y:2005,pi:856,c:"S2",sp:6.5,ha:9.7,ac:6.5,la:4.6,br:10.0,of:5.0,r:"EPIC",v:180000,co:"Germany"},
    {m:"911 GT3",y:2004,pi:674,c:"A",sp:7.1,ha:6.1,ac:6.4,la:5.7,br:5.3,of:5.4,r:"RARE",v:135000,co:"Germany"},
    {m:"Carrera GT",y:2003,pi:758,c:"S1",sp:7.6,ha:6.1,ac:6.6,la:7.2,br:7.4,of:5.0,r:"EPIC",v:1800000,co:"Germany"},
    {m:"911 GT1 Strassenversion",y:1997,pi:746,c:"S1",sp:7.4,ha:6.8,ac:6.0,la:6.3,br:8.2,of:4.5,r:"LEGENDARY",v:4000000,co:"Germany"},
    {m:"911 GT2",y:1995,pi:644,c:"A",sp:6.5,ha:5.6,ac:6.7,la:4.8,br:5.3,of:5.1,r:"EPIC",v:1100000,co:"Germany"},
    {m:"911 Turbo S Leichtbau",y:1993,pi:652,c:"A",sp:7.0,ha:5.4,ac:6.6,la:3.5,br:5.0,of:5.2,r:"LEGENDARY",v:600000,co:"Germany"},
    {m:"928 GTS",y:1993,pi:563,c:"B",sp:6.4,ha:4.9,ac:5.0,la:3.9,br:4.0,of:5.4,r:"RARE",v:150000,co:"Germany"},
    {m:"968 Turbo S",y:1993,pi:594,c:"B",sp:6.2,ha:4.7,ac:5.3,la:4.5,br:4.1,of:5.2,r:"RARE",v:520000,co:"Germany"},
    {m:"944 Turbo",y:1989,pi:539,c:"B",sp:5.8,ha:4.9,ac:4.9,la:2.6,br:4.1,of:5.6,r:"RARE",v:30000,co:"Germany"},
    {m:"959",y:1987,pi:661,c:"A",sp:7.3,ha:5.5,ac:8.2,la:4.7,br:4.9,of:5.2,r:"TREASURE",v:1875000,co:"Germany"},
    {m:"185 959 Prodrive Rally Raid",y:1986,pi:623,c:"A",sp:6.1,ha:5.0,ac:7.5,la:6.1,br:4.3,of:7.9,r:"LEGENDARY",v:1500000,co:"Germany"},
    {m:"911 Turbo 3.3",y:1982,pi:550,c:"B",sp:5.6,ha:4.7,ac:4.8,la:2.0,br:4.1,of:5.6,r:"BARN",v:240000,co:"Germany"},
    {m:"911 Carrera RS",y:1973,pi:490,c:"C",sp:5.2,ha:4.5,ac:5.1,la:3.7,br:3.1,of:5.3,r:"LEGENDARY",v:1050000,co:"Germany"},
    {m:"3 917 LH",y:1970,pi:776,c:"S1",sp:8.2,ha:5.2,ac:7.2,la:7.1,br:4.9,of:4.5,r:"LEGENDARY",v:1000000,co:"Germany"},
    {m:"3 917 LH Forza Edition",y:1970,pi:998,c:"R",sp:9.5,ha:9.8,ac:6.8,la:6.8,br:10.0,of:5.9,r:"FORZA",v:1250000,co:"Germany"},
  ],
  "RIVIAN": [
    {m:"R1T",y:2021,pi:607,c:"A",sp:4.4,ha:2.9,ac:6.6,la:7.2,br:4.1,of:8.3,r:"EPIC",v:56000,co:"United States"},
  ],
  "RJ Anderson": [
    {m:"37 Polaris RZR Pro 4 Truck",y:2021,pi:677,c:"A",sp:5.4,ha:2.9,ac:8.1,la:8.5,br:5.3,of:9.0,r:"EPIC",v:250000,co:"United States"},
    {m:"37 Polaris RZR Pro 2 Truck",y:2016,pi:674,c:"A",sp:5.9,ha:3.7,ac:4.5,la:4.2,br:5.1,of:10.0,r:"EPIC",v:120000,co:"United States"},
  ],
  "Radical": [
    {m:"RXC Turbo",y:2015,pi:842,c:"S2",sp:7.0,ha:8.2,ac:7.0,la:5.8,br:8.3,of:4.6,r:"EPIC",v:147000,co:"United Kingdom"},
  ],
  "Ram": [
    {m:"1500 TRX",y:2024,pi:514,c:"B",sp:5.9,ha:2.9,ac:6.3,la:4.9,br:3.3,of:8.8,r:"COMMON",v:100000,co:"United States"},
  ],
  "Reliant": [
    {m:"Supervan III",y:1972,pi:100,c:"D",sp:2.6,ha:2.9,ac:2.2,la:4.5,br:2.0,of:6.1,r:"COMMON",v:39000,co:"United Kingdom"},
  ],
  "Renault": [
    {m:"Megane RS",y:2018,pi:547,c:"B",sp:5.7,ha:5.6,ac:4.5,la:4.6,br:4.4,of:5.3,r:"RARE",v:32000,co:"France"},
    {m:"Megane RS 250",y:2010,pi:538,c:"B",sp:5.6,ha:5.4,ac:4.8,la:2.9,br:4.8,of:5.4,r:"COMMON",v:14000,co:"France"},
    {m:"Megane R26R",y:2008,pi:561,c:"B",sp:5.4,ha:5.4,ac:4.8,la:4.0,br:5.2,of:5.2,r:"RARE",v:58000,co:"France"},
    {m:"Clio Williams",y:1993,pi:400,c:"D",sp:4.7,ha:4.3,ac:4.0,la:3.1,br:2.9,of:5.2,r:"COMMON",v:30000,co:"France"},
    {m:"5 Turbo",y:1980,pi:417,c:"C",sp:4.5,ha:4.0,ac:4.6,la:3.3,br:2.9,of:6.3,r:"RARE",v:143000,co:"France"},
    {m:"8 Gordini",y:1967,pi:322,c:"D",sp:4.0,ha:4.2,ac:3.5,la:2.8,br:2.9,of:6.1,r:"COMMON",v:250000,co:"France"},
  ],
  "Rimac": [
    {m:"Nevera",y:2021,pi:913,c:"R",sp:9.0,ha:6.9,ac:8.2,la:9.2,br:8.3,of:4.9,r:"LEGENDARY",v:2250000,co:"Croatia"},
  ],
  "SIERRA Cars": [
    {m:"700R",y:2021,pi:346,c:"D",sp:2.7,ha:5.3,ac:4.1,la:6.9,br:6.3,of:8.6,r:"RARE",v:75000,co:"United States"},
    {m:"RX3",y:2021,pi:635,c:"A",sp:4.3,ha:4.9,ac:6.4,la:7.1,br:5.9,of:7.9,r:"RARE",v:50000,co:"United States"},
    {m:"23 Yokohama ALPHA",y:2020,pi:926,c:"R",sp:6.2,ha:8.9,ac:7.6,la:4.5,br:10.0,of:4.5,r:"EPIC",v:65000,co:"United States"},
  ],
  "SRT": [
    {m:"Viper GTS",y:2013,pi:707,c:"S1",sp:7.6,ha:5.6,ac:5.5,la:4.6,br:5.8,of:5.1,r:"RARE",v:135000,co:"United States"},
  ],
  "Saleen": [
    {m:"S7 LM",y:2017,pi:835,c:"S2",sp:8.9,ha:7.1,ac:7.2,la:6.5,br:7.2,of:4.9,r:"EPIC",v:1000000,co:"United States"},
  ],
  "Schuppan": [
    {m:"962CR",y:1993,pi:764,c:"S1",sp:8.3,ha:7.4,ac:4.9,la:2.8,br:6.8,of:5.0,r:"EPIC",v:1950000,co:"United Kingdom"},
  ],
  "Shelby": [
    {m:"Cobra 427 S/C",y:1965,pi:582,c:"B",sp:5.9,ha:3.8,ac:4.5,la:4.6,br:3.2,of:4.7,r:"LEGENDARY",v:3000000,co:"United States"},
    {m:"Cobra Daytona Coupe",y:1965,pi:515,c:"B",sp:6.7,ha:3.6,ac:3.7,la:2.9,br:2.8,of:4.9,r:"LEGENDARY",v:20000000,co:"United States"},
  ],
  "Subaru": [
    {m:"BRZ",y:2022,pi:551,c:"B",sp:5.4,ha:5.5,ac:5.1,la:4.7,br:4.2,of:5.4,r:"EPIC",v:28000,co:"Japan"},
    {m:"BRZ Forza Edition",y:2022,pi:700,c:"A",sp:7.6,ha:4.3,ac:7.7,la:7.0,br:4.3,of:10.0,r:"FORZA",v:500000,co:"Japan"},
    {m:"WRX",y:2022,pi:538,c:"B",sp:5.9,ha:5.2,ac:5.6,la:6.0,br:3.8,of:6.0,r:"EPIC",v:25000,co:"Japan"},
    {m:"STI S209",y:2019,pi:575,c:"B",sp:6.0,ha:5.3,ac:5.8,la:3.1,br:4.4,of:5.9,r:"COMMON",v:250000,co:"Japan"},
    {m:"WRX STI ARX Supercar",y:2018,pi:758,c:"S1",sp:5.4,ha:5.6,ac:7.8,la:2.2,br:5.9,of:8.1,r:"EPIC",v:150000,co:"Japan"},
    {m:"WRX STI",y:2015,pi:555,c:"B",sp:6.0,ha:5.3,ac:5.5,la:3.1,br:3.9,of:5.9,r:"COMMON",v:27000,co:"Japan"},
    {m:"BRZ",y:2013,pi:463,c:"C",sp:5.7,ha:4.6,ac:4.2,la:3.6,br:3.1,of:5.3,r:"COMMON",v:25000,co:"Japan"},
    {m:"WRX STI",y:2011,pi:547,c:"B",sp:6.0,ha:5.3,ac:5.1,la:2.8,br:3.9,of:6.2,r:"RARE",v:27000,co:"Japan"},
    {m:"IMPREZA WRX STI",y:2008,pi:539,c:"B",sp:5.7,ha:5.1,ac:5.4,la:3.8,br:3.7,of:5.9,r:"RARE",v:27000,co:"Japan"},
    {m:"IMPREZA WRX STI",y:2005,pi:570,c:"B",sp:6.2,ha:4.9,ac:6.3,la:3.2,br:3.6,of:6.1,r:"COMMON",v:35000,co:"Japan"},
    {m:"LEGACY B4 2.0 GT",y:2005,pi:549,c:"B",sp:6.5,ha:4.8,ac:6.0,la:5.8,br:3.3,of:5.6,r:"COMMON",v:10000,co:"Japan"},
    {m:"IMPREZA WRX STI",y:2004,pi:552,c:"B",sp:5.9,ha:4.9,ac:6.0,la:3.6,br:3.6,of:5.9,r:"COMMON",v:30000,co:"Japan"},
    {m:"Impreza 22B-STi Version",y:1998,pi:600,c:"B",sp:5.9,ha:4.9,ac:7.0,la:4.7,br:4.0,of:5.7,r:"LEGENDARY",v:86000,co:"Japan"},
    {m:"SVX",y:1996,pi:466,c:"C",sp:5.8,ha:5.0,ac:3.5,la:2.4,br:3.2,of:5.6,r:"COMMON",v:13000,co:"Japan"},
    {m:"Vivio RX-R",y:1994,pi:281,c:"D",sp:3.8,ha:4.3,ac:2.6,la:4.2,br:2.8,of:5.9,r:"EPIC",v:10000,co:"Japan"},
    {m:"Vivio RX-R Forza Edition",y:1994,pi:900,c:"S2",sp:6.3,ha:8.7,ac:5.9,la:6.3,br:9.8,of:4.2,r:"FORZA",v:750000,co:"Japan"},
    {m:"LEGACY RS",y:1990,pi:406,c:"C",sp:5.3,ha:4.3,ac:3.8,la:2.4,br:2.8,of:5.6,r:"COMMON",v:15000,co:"Japan"},
    {m:"BRAT GL",y:1980,pi:159,c:"D",sp:3.6,ha:3.9,ac:2.3,la:2.1,br:1.9,of:6.7,r:"COMMON",v:20000,co:"Japan"},
  ],
  "TVR": [
    {m:"Griffith",y:2018,pi:729,c:"S1",sp:7.2,ha:6.9,ac:5.9,la:6.3,br:6.8,of:4.7,r:"RARE",v:250000,co:"United Kingdom"},
    {m:"Sagaris",y:2005,pi:672,c:"A",sp:6.7,ha:5.6,ac:5.3,la:5.5,br:5.0,of:4.8,r:"RARE",v:115000,co:"United Kingdom"},
    {m:"Cerbera Speed 12",y:1998,pi:770,c:"S1",sp:8.7,ha:6.3,ac:5.4,la:5.7,br:6.6,of:3.8,r:"EPIC",v:750000,co:"United Kingdom"},
  ],
  "Toyota": [
    {m:"Land Cruiser",y:2025,pi:456,c:"C",sp:5.7,ha:2.5,ac:4.9,la:6.7,br:2.9,of:7.6,r:"RARE",v:70000,co:"Japan"},
    {m:"Camry TRD",y:2023,pi:525,c:"B",sp:6.3,ha:4.8,ac:4.4,la:4.2,br:3.6,of:5.3,r:"EPIC",v:31000,co:"Japan"},
    {m:"GR86",y:2022,pi:556,c:"B",sp:5.5,ha:5.4,ac:5.1,la:4.8,br:4.3,of:5.3,r:"COMMON",v:28000,co:"Japan"},
    {m:"GR Yaris",y:2021,pi:558,c:"B",sp:5.2,ha:5.1,ac:6.3,la:5.0,br:4.9,of:5.6,r:"EPIC",v:54000,co:"Japan"},
    {m:"GR Supra",y:2020,pi:616,c:"A",sp:6.2,ha:5.5,ac:5.5,la:5.8,br:4.6,of:5.3,r:"RARE",v:45000,co:"Japan"},
    {m:"4Runner TRD Pro",y:2019,pi:421,c:"C",sp:5.1,ha:3.5,ac:3.3,la:2.3,br:3.2,of:9.1,r:"RARE",v:42000,co:"Japan"},
    {m:"Tacoma TRD Pro",y:2019,pi:409,c:"C",sp:4.9,ha:3.4,ac:3.2,la:2.5,br:3.1,of:8.9,r:"RARE",v:34000,co:"Japan"},
    {m:"Tacoma TRD Pro Forza Edition",y:2019,pi:998,c:"R",sp:8.2,ha:9.5,ac:10.0,la:10.0,br:10.0,of:6.0,r:"FORZA",v:500000,co:"Japan"},
    {m:"JPN Taxi",y:2017,pi:248,c:"D",sp:3.8,ha:4.1,ac:2.3,la:2.2,br:2.7,of:6.0,r:"COMMON",v:25000,co:"Japan"},
    {m:"Land Cruiser Arctic Trucks AT37",y:2016,pi:332,c:"D",sp:4.2,ha:3.8,ac:2.7,la:2.5,br:2.7,of:9.5,r:"RARE",v:250000,co:"Japan"},
    {m:"86",y:2013,pi:460,c:"C",sp:5.5,ha:4.6,ac:4.2,la:3.6,br:3.2,of:5.2,r:"RARE",v:15800,co:"Japan"},
    {m:"86 Stories",y:2013,pi:685,c:"A",sp:6.8,ha:6.3,ac:5.3,la:5.3,br:5.2,of:4.7,r:"LEGENDARY",v:250000,co:"Japan"},
    {m:"Crown Super Deluxe Taxi",y:2005,pi:181,c:"D",sp:3.6,ha:4.3,ac:1.9,la:1.3,br:2.5,of:5.9,r:"COMMON",v:10000,co:"Japan"},
    {m:"Celica Sport Specialty II",y:2003,pi:433,c:"C",sp:5.5,ha:4.4,ac:3.8,la:3.0,br:3.0,of:5.6,r:"RARE",v:12000,co:"Japan"},
    {m:"Altezza RS200 Z EDITION",y:1999,pi:461,c:"C",sp:5.7,ha:4.9,ac:4.3,la:3.5,br:3.2,of:5.7,r:"RARE",v:250000,co:"Japan"},
    {m:"Supra RZ",y:1998,pi:526,c:"B",sp:6.4,ha:4.8,ac:4.6,la:3.1,br:3.5,of:5.2,r:"RARE",v:60000,co:"Japan"},
    {m:"Chaser 2.5 Tourer V",y:1997,pi:504,c:"B",sp:5.6,ha:4.7,ac:4.0,la:2.6,br:3.3,of:5.6,r:"RARE",v:15500,co:"Japan"},
    {m:"Soarer 2.5 GT-T",y:1997,pi:491,c:"C",sp:6.2,ha:4.6,ac:4.1,la:2.9,br:3.1,of:5.9,r:"RARE",v:18000,co:"Japan"},
    {m:"Starlet Glanza V",y:1996,pi:435,c:"C",sp:5.0,ha:3.9,ac:4.0,la:2.1,br:3.0,of:5.6,r:"COMMON",v:250000,co:"Japan"},
    {m:"JJ Motorsport Supra WTAC",y:1995,pi:828,c:"S2",sp:6.8,ha:8.3,ac:5.7,la:6.0,br:9.5,of:4.0,r:"EPIC",v:420000,co:"Japan"},
    {m:"MR2 GT",y:1995,pi:522,c:"B",sp:6.2,ha:4.7,ac:5.3,la:3.9,br:3.1,of:5.2,r:"RARE",v:28000,co:"Japan"},
    {m:"Celica GT-Four ST205",y:1994,pi:479,c:"C",sp:6.1,ha:4.6,ac:5.1,la:2.9,br:3.0,of:5.6,r:"COMMON",v:27000,co:"Japan"},
    {m:"1 T100 Baja Truck",y:1993,pi:584,c:"B",sp:4.7,ha:3.7,ac:5.9,la:6.0,br:4.7,of:10.0,r:"LEGENDARY",v:400000,co:"Japan"},
    {m:"Celica GT-Four RC ST185",y:1992,pi:438,c:"C",sp:5.8,ha:4.2,ac:4.7,la:2.9,br:2.7,of:5.7,r:"RARE",v:30000,co:"Japan"},
    {m:"Supra 2.0 GT",y:1992,pi:454,c:"C",sp:5.4,ha:4.6,ac:4.1,la:2.7,br:3.0,of:5.5,r:"RARE",v:28000,co:"Japan"},
    {m:"Chaser GT Twin Turbo",y:1991,pi:484,c:"C",sp:5.8,ha:4.5,ac:4.0,la:1.8,br:3.1,of:5.6,r:"RARE",v:20000,co:"Japan"},
    {m:"Sera",y:1991,pi:344,c:"D",sp:4.3,ha:4.1,ac:2.7,la:1.7,br:3.0,of:5.6,r:"RARE",v:11000,co:"Japan"},
    {m:"MR2 SC",y:1989,pi:397,c:"D",sp:5.1,ha:4.5,ac:3.8,la:3.3,br:2.8,of:5.6,r:"RARE",v:250000,co:"Japan"},
    {m:"Sprinter Trueno GT Apex",y:1985,pi:376,c:"D",sp:4.5,ha:4.0,ac:4.0,la:3.4,br:2.6,of:5.5,r:"EPIC",v:30000,co:"Japan"},
    {m:"Sprinter Trueno GT-APEX Forza Edition",y:1985,pi:600,c:"B",sp:5.0,ha:5.8,ac:4.5,la:4.6,br:5.5,of:4.4,r:"FORZA",v:500000,co:"Japan"},
    {m:"FJ40",y:1979,pi:157,c:"D",sp:3.4,ha:2.6,ac:2.4,la:3.4,br:2.3,of:7.8,r:"COMMON",v:103000,co:"Japan"},
    {m:"Corolla SR5",y:1974,pi:197,c:"D",sp:3.7,ha:3.4,ac:2.2,la:2.9,br:2.2,of:5.4,r:"EPIC",v:250000,co:"Japan"},
    {m:"2000GT",y:1969,pi:377,c:"D",sp:5.1,ha:4.0,ac:3.7,la:2.7,br:2.6,of:5.3,r:"BARN",v:1000000,co:"Japan"},
    {m:"Sports 800",y:1965,pi:141,c:"D",sp:3.1,ha:4.5,ac:1.8,la:2.3,br:2.9,of:6.0,r:"RARE",v:250000,co:"Japan"},
  ],
  "Ultima": [
    {m:"Evolution Coupe 1020",y:2015,pi:925,c:"R",sp:8.8,ha:8.2,ac:7.7,la:8.4,br:8.0,of:4.9,r:"EPIC",v:150000,co:"United Kingdom"},
  ],
  "Volkswagen": [
    {m:"Golf R",y:2022,pi:548,c:"B",sp:6.1,ha:5.5,ac:5.6,la:6.0,br:4.3,of:6.0,r:"RARE",v:35000,co:"Germany"},
    {m:"Golf R",y:2021,pi:546,c:"B",sp:5.9,ha:5.5,ac:5.6,la:6.2,br:3.9,of:5.9,r:"COMMON",v:29000,co:"Germany"},
    {m:"34 Andretti Rally Cross Beetle",y:2017,pi:764,c:"S1",sp:4.8,ha:5.3,ac:9.2,la:4.6,br:5.9,of:7.8,r:"EPIC",v:150000,co:"Germany"},
    {m:"Golf R",y:2014,pi:536,c:"B",sp:5.9,ha:5.4,ac:5.8,la:6.3,br:3.8,of:5.9,r:"COMMON",v:27000,co:"Germany"},
    {m:"Scirocco R",y:2011,pi:548,c:"B",sp:5.8,ha:5.1,ac:4.6,la:4.8,br:4.0,of:5.3,r:"RARE",v:15000,co:"Germany"},
    {m:"Golf R",y:2010,pi:526,c:"B",sp:5.8,ha:5.3,ac:5.0,la:3.2,br:3.5,of:5.8,r:"RARE",v:20000,co:"Germany"},
    {m:"Corrado VR6",y:1995,pi:426,c:"C",sp:5.4,ha:4.4,ac:3.6,la:3.3,br:2.8,of:5.3,r:"COMMON",v:30000,co:"Germany"},
    {m:"Golf Gti 16v Mk2",y:1992,pi:308,c:"D",sp:4.6,ha:4.0,ac:3.4,la:2.5,br:2.4,of:5.2,r:"COMMON",v:22000,co:"Germany"},
    {m:"Rallye Golf",y:1989,pi:440,c:"C",sp:5.1,ha:4.6,ac:3.2,la:4.5,br:2.9,of:5.9,r:"RARE",v:250000,co:"Germany"},
    {m:"Golf GTI",y:1983,pi:314,c:"D",sp:4.2,ha:3.6,ac:3.5,la:3.3,br:2.4,of:5.3,r:"COMMON",v:18000,co:"Germany"},
    {m:"Pickup LX",y:1982,pi:100,c:"D",sp:2.7,ha:3.3,ac:1.6,la:2.4,br:2.5,of:6.6,r:"EPIC",v:16000,co:"Germany"},
    {m:"Class 5 1600 Baja Bug",y:1969,pi:260,c:"D",sp:3.5,ha:4.3,ac:2.5,la:4.7,br:3.1,of:8.0,r:"RARE",v:35000,co:"Germany"},
    {m:"Beetle",y:1963,pi:100,c:"D",sp:2.9,ha:3.5,ac:1.7,la:2.9,br:1.9,of:5.9,r:"LEGENDARY",v:17000,co:"Germany"},
    {m:"Type 2 De Luxe",y:1963,pi:100,c:"D",sp:2.6,ha:3.5,ac:1.5,la:3.0,br:2.0,of:5.9,r:"RARE",v:178000,co:"Germany"},
  ],
  "Volvo": [
    {m:"242 Turbo Evolution",y:1983,pi:435,c:"C",sp:5.0,ha:3.7,ac:4.0,la:3.6,br:3.1,of:5.7,r:"COMMON",v:30000,co:"Sweden"},
  ],
  "Wuling": [
    {m:"Hongguang Mini EV",y:2022,pi:100,c:"D",sp:2.1,ha:4.9,ac:1.5,la:1.9,br:3.3,of:6.2,r:"RARE",v:5000,co:"China"},
    {m:"Sunshine S Forza Edition",y:2020,pi:800,c:"S1",sp:7.1,ha:7.5,ac:5.9,la:6.2,br:7.7,of:5.3,r:"FORZA",v:500000,co:"China"},
    {m:"Sunshine S",y:2013,pi:107,c:"D",sp:3.1,ha:4.2,ac:1.5,la:1.9,br:2.6,of:6.5,r:"RARE",v:2000,co:"China"},
  ],
  "Zenvo": [
    {m:"TSR-S",y:2019,pi:906,c:"R",sp:9.2,ha:9.1,ac:7.6,la:8.3,br:10.0,of:4.8,r:"LEGENDARY",v:1200000,co:"Denmark"},
  ],
};

const MAKES = Object.keys(FH6_CARS).sort();
const CLASSES = [
  { id: "D",  label: "D",  range: "100-400",  color: "#9B7BB3" },
  { id: "C",  label: "C",  range: "401-500",  color: "#5BB3D1" },
  { id: "B",  label: "B",  range: "501-600",  color: "#5BD18E" },
  { id: "A",  label: "A",  range: "601-700",  color: "#D1B85B" },
  { id: "S1", label: "S1", range: "701-800",  color: "#D17A5B" },
  { id: "S2", label: "S2", range: "801-900",  color: "#D15B6F" },
  { id: "R",  label: "R",  range: "901+",     color: "#FF5E8C" },
];
const CLASS_PI_TOP = { D: 400, C: 500, B: 600, A: 700, S1: 800, S2: 900, R: 999 };
const CLASS_PI_BOTTOM = { D: 100, C: 401, B: 501, A: 601, S1: 701, S2: 801, R: 901 };

const DRIVING_STYLES = [
  { id: "grip",     label: "Grip / Circuit",       icon: "◎", desc: "Max cornering, planted" },
  { id: "balanced", label: "Balanced",             icon: "⊙", desc: "All-around road & track" },
  { id: "drift",    label: "Drift / Oversteer",    icon: "⟳", desc: "Loose rear, angle friendly" },
  { id: "drag",     label: "Drag / Straight-line", icon: "→", desc: "Launch, traction, top speed" },
  { id: "rally",    label: "Off-road / Rally",     icon: "⛰", desc: "Suspension travel, durability" },
];

const TRACK_TYPES = ["Circuit (Road)", "Oval / High-Speed", "Mixed Surface / Street", "Drag Strip", "Off-road / Dirt", "Hill Climb"];
const DRIVETRAINS = ["AUTO", "RWD", "FWD", "AWD"];


// ─── Upgrade Sections ───────────────────────────────
const UPGRADE_SECTIONS = [
  { key: "engine", label: "Engine", icon: "⚡", fields: [
    { key: "intake", label: "Intake" },
    { key: "fuel_system", label: "Fuel System" },
    { key: "ignition", label: "Ignition" },
    { key: "exhaust", label: "Exhaust" },
    { key: "camshaft", label: "Camshaft" },
    { key: "valves", label: "Valves" },
    { key: "displacement", label: "Displacement" },
    { key: "pistons", label: "Pistons" },
    { key: "forced_induction_type", label: "FI Type (if adding)" },
    { key: "forced_induction_tier", label: "Forced Induction" },
    { key: "intercooler", label: "Intercooler" },
    { key: "note", label: "Note" },
  ]},
  { key: "platform", label: "Platform", icon: "⊞", fields: [
    { key: "brakes", label: "Brakes" },
    { key: "springs_dampers", label: "Springs & Dampers" },
    { key: "front_arb", label: "Front ARB" },
    { key: "rear_arb", label: "Rear ARB" },
    { key: "chassis_reinforcement", label: "Chassis Reinforcement" },
    { key: "weight_reduction", label: "Weight Reduction" },
    { key: "front_track_width", label: "Front Track Width" },
    { key: "rear_track_width", label: "Rear Track Width" },
    { key: "note", label: "Note" },
  ]},
  { key: "drivetrain", label: "Drivetrain", icon: "⚙", fields: [
    { key: "clutch", label: "Clutch" },
    { key: "flywheel", label: "Flywheel" },
    { key: "transmission", label: "Transmission" },
    { key: "driveline", label: "Driveline" },
    { key: "differential", label: "Differential" },
    { key: "note", label: "Note" },
  ]},
  { key: "tires_rims", label: "Tires", icon: "◉", fields: [
    { key: "compound", label: "Compound" },
    { key: "front_width", label: "Front Width" },
    { key: "rear_width", label: "Rear Width" },
    { key: "note", label: "Note" },
  ]},
  { key: "aero_body", label: "Aero/Body", icon: "⇑", fields: [
    { key: "front_bumper", label: "Front Bumper" },
    { key: "rear_wing", label: "Rear Wing" },
    { key: "note", label: "Note" },
  ]},
];

// ─── Tune Sections ───────────────────────────────
const TUNE_SECTIONS = [
  { key: "tire_pressure", label: "Tire Pressure", icon: "◉", fields: [
    { key: "front", label: "Front", unit: "PSI" },
    { key: "rear", label: "Rear", unit: "PSI" },
  ]},
  { key: "gearing", label: "Gearing", icon: "⚙", fields: [
    { key: "final_drive", label: "Final Drive" },
    { key: "gear_1", label: "1st" },
    { key: "gear_2", label: "2nd" },
    { key: "gear_3", label: "3rd" },
    { key: "gear_4", label: "4th" },
    { key: "gear_5", label: "5th" },
    { key: "gear_6", label: "6th" },
    { key: "gear_7", label: "7th" },
    { key: "gear_8", label: "8th" },
    { key: "gear_9", label: "9th" },
    { key: "note", label: "Note" },
  ]},
  { key: "alignment", label: "Alignment", icon: "⊿", fields: [
    { key: "camber_front", label: "Camber Front", unit: "°" },
    { key: "camber_rear", label: "Camber Rear", unit: "°" },
    { key: "toe_front", label: "Toe Front", unit: "°" },
    { key: "toe_rear", label: "Toe Rear", unit: "°" },
    { key: "front_caster", label: "Front Caster", unit: "°" },
  ]},
  { key: "antiroll_bars", label: "Antiroll Bars", icon: "⇌", fields: [
    { key: "front", label: "Front" },
    { key: "rear", label: "Rear" },
  ]},
  { key: "springs", label: "Springs", icon: "⋀", fields: [
    { key: "front_rate_pct", label: "Front Rate", unit: "%" },
    { key: "rear_rate_pct", label: "Rear Rate", unit: "%" },
    { key: "front_ride_height_pct", label: "Front Height", unit: "%" },
    { key: "rear_ride_height_pct", label: "Rear Height", unit: "%" },
  ]},
  { key: "damping", label: "Damping", icon: "〜", fields: [
    { key: "front_rebound", label: "Front Rebound" },
    { key: "rear_rebound", label: "Rear Rebound" },
    { key: "front_bump", label: "Front Bump" },
    { key: "rear_bump", label: "Rear Bump" },
  ]},
  { key: "aero", label: "Aero", icon: "⇑", fields: [
    { key: "front_downforce_pct", label: "Front Downforce", unit: "%" },
    { key: "rear_downforce_pct", label: "Rear Downforce", unit: "%" },
    { key: "note", label: "Note" },
  ]},
  { key: "brakes", label: "Brakes", icon: "⬡", fields: [
    { key: "balance", label: "Balance", unit: "% front" },
    { key: "pressure", label: "Pressure", unit: "%" },
  ]},
  { key: "differential", label: "Differential", icon: "⊕", fields: [
    { key: "front_accel", label: "Front Accel", unit: "%" },
    { key: "front_decel", label: "Front Decel", unit: "%" },
    { key: "rear_accel", label: "Rear Accel", unit: "%" },
    { key: "rear_decel", label: "Rear Decel", unit: "%" },
    { key: "center_balance", label: "Center Balance", unit: "%" },
  ]},
];

const FONT = "Rajdhani, Arial Narrow, Arial, sans-serif";

const SEL = {
  background: "transparent", border: "1px solid #1A3050",
  padding: "10px 36px 10px 14px", color: "#C8DCF0",
  fontFamily: FONT, fontSize: "14px",
  width: "100%", boxSizing: "border-box", cursor: "pointer",
  appearance: "none", WebkitAppearance: "none",
};
const LBL = {
  display: "block", fontSize: "12px", letterSpacing: "0.25em",
  color: "#00B4FF", marginBottom: "8px", fontFamily: FONT, fontWeight: "700",
};
const CARD = {
  background: "#080F1E", border: "1px solid #0E1E32",
  borderTop: "2px solid #00B4FF", padding: "20px 24px", borderRadius: "2px",
};

export default function FH6Tuner({ initialBuild = null, initialInputs = null, initialBuildId = null, initialForzaCode = null } = {}) {
  const isMobile = useIsMobile();
  // When viewing a shared build (initialBuild provided), skip the password gate entirely.
  // Otherwise initialize from localStorage as before.
  const [pwGate, setPwGate] = useState(() => {
    if (initialBuild) return false;
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("fh6_pw");
    return !stored;
  });
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");

  const submitPassword = () => {
    const trimmed = pwInput.trim();
    if (!trimmed) {
      setPwError("Enter a password");
      return;
    }
    localStorage.setItem("fh6_pw", trimmed);
    setPwGate(false);
    setPwError("");
  };

  const [make, setMake] = useState(initialInputs?.make || "");
  const [carKey, setCarKey] = useState(initialInputs ? `${initialInputs.carYear}|${initialInputs.carModel}` : ""); // "year|model"
  const [drivetrain, setDrivetrain] = useState(initialInputs?.drivetrain || "AUTO");
  const [style, setStyle] = useState(initialInputs?.style || "balanced");
  const [track, setTrack] = useState(initialInputs?.track || "Circuit (Road)");
  const [targetClass, setTargetClass] = useState(initialInputs?.targetClass || "");
  const [loading, setLoading] = useState(false);
  const [build, setBuild] = useState(initialBuild || null);
  const [error, setError] = useState(null);
  const [activeUpgrade, setActiveUpgrade] = useState(initialBuild ? "engine" : null);
  const [activeTune, setActiveTune] = useState(null);
  const [view, setView] = useState("upgrades");
  const [buildId, setBuildId] = useState(initialBuildId || null);
  const [copyStatus, setCopyStatus] = useState("idle"); // idle | copied
  const [forzaCode, setForzaCode] = useState(initialForzaCode || null);
  const [forzaCodeInput, setForzaCodeInput] = useState("");
  const [forzaCodeEditing, setForzaCodeEditing] = useState(false);
  const [forzaCodeError, setForzaCodeError] = useState("");
  const [forzaCodeSaving, setForzaCodeSaving] = useState(false);
  const [forzaCodeCopyStatus, setForzaCodeCopyStatus] = useState("idle");

  const models = useMemo(() => make ? (FH6_CARS[make] || []) : [], [make]);
  const selectedCar = useMemo(() => {
    if (!make || !carKey) return null;
    return (FH6_CARS[make] || []).find(c => `${c.y}|${c.m}` === carKey) || null;
  }, [make, carKey]);

  // Auto-set target class to stock class when car selected
  const handleMakeChange = (e) => { setMake(e.target.value); setCarKey(""); setTargetClass(""); };
  const handleCarChange = (e) => {
    setCarKey(e.target.value);
    const car = (FH6_CARS[make] || []).find(c => `${c.y}|${c.m}` === e.target.value);
    if (car) setTargetClass(car.c);
  };

  const canGenerate = make && carKey && targetClass && !loading;
  const selectedStyle = DRIVING_STYLES.find(s => s.id === style);

  const generateBuild = async () => {
    if (!canGenerate) return;
    setLoading(true); setError(null); setBuild(null);
    setActiveUpgrade(null); setActiveTune(null);

    const styleLabel = DRIVING_STYLES.find(s => s.id === style)?.label || style;
    const car = selectedCar;
    const stockClass = car.c;
    const stockPi = car.pi;
    const targetTopPi = CLASS_PI_TOP[targetClass];
    const piGap = targetTopPi - stockPi;
    const direction = piGap > 0 ? `UPGRADE +${piGap} PI` : piGap < 0 ? `DOWNGRADE ${piGap} PI` : "AT TARGET";

    const userPrompt = `CAR: ${make} ${car.m} (${car.y})
STOCK SPEC:
  PI: ${stockPi} (Class ${stockClass})
  Speed: ${car.sp}/10
  Handling: ${car.ha}/10
  Acceleration: ${car.ac}/10
  Launch: ${car.la}/10
  Braking: ${car.br}/10
  Offroad: ${car.of}/10
  Country: ${car.co}
  Rarity: ${car.r}

TARGET: Class ${targetClass} (aim for top of class, ~${targetTopPi - 3} PI)
DIRECTION: ${direction}

BUILD CONTEXT:
  Drivetrain: ${drivetrain}
  Driving Style: ${styleLabel}
  Track Type: ${track}

Generate a complete FH6 build hitting the target PI class. Lean on the car's stat strengths and shore up weaknesses. Tune for the chosen driving style on the chosen track.`;

    try {
      const storedPw = typeof window !== "undefined" ? (localStorage.getItem("fh6_pw") || "").trim() : "";
      const res = await fetch("/api/generate-build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-password": storedPw,
        },
        body: JSON.stringify({ userPrompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("fh6_pw");
          setPwGate(true);
          setError("Password rejected. Please re-enter.");
          return;
        }
        setError(data?.error || `Request failed: ${res.status}`);
        return;
      }
      // If user chose AUTO, replace the local drivetrain state with the AI's pick
      // so the sidebar and downstream displays show the resolved value.
      if (drivetrain === "AUTO") {
        const aiChoice = data?.build?.chosen_drivetrain || "RWD";
        setDrivetrain(aiChoice);
      }
      setBuild(data.build);
      setActiveUpgrade("engine");
      setView("upgrades");
      setCopyStatus("idle");

      // Persist the build and update the URL with the new shareable ID
      try {
        const car = selectedCar; // captured by closure
        const inputs = {
          make,
          carModel: car?.m,
          carYear: car?.y,
          carName: `${car?.y} ${make} ${car?.m}`,
          stockPi: car?.pi,
          stockClass: car?.c,
          drivetrain: drivetrain === "AUTO"
            ? (data?.build?.chosen_drivetrain || "RWD")
            : drivetrain,
          style,
          track,
          targetClass,
        };
        const saveRes = await fetch("/api/save-build", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-password": storedPw,
          },
          body: JSON.stringify({ buildData: data.build, inputs }),
        });
        if (saveRes.ok) {
          const { id } = await saveRes.json();
          setBuildId(id);
          // Update browser URL without reloading
          if (typeof window !== "undefined") {
            window.history.pushState({}, "", `/builds/${id}`);
          }
        }
      } catch (saveErr) {
        // Failing to save a build link shouldn't break the user's session.
        // Log and continue — the build is still visible, just not shareable yet.
        console.warn("Build save failed:", saveErr);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (sections, activeKey, dataRoot) => {
    const sec = sections.find(s => s.key === activeKey);
    const data = dataRoot?.[activeKey];
    if (!sec || !data) return null;
    const validFields = sec.fields.filter(f => data[f.key] !== null && data[f.key] !== undefined && data[f.key] !== "");
    return (
      <div style={{ border: "1px solid #152840", background: "#080F1E", animation: "fadeIn 0.15s ease", marginBottom: "20px" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #0E1E32", fontSize: "12px", letterSpacing: "0.2em", color: "#00B4FF", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>{sec.icon}</span> {sec.label.toUpperCase()}
        </div>
        <div>
          {validFields.map((field, i) => {
            const val = data[field.key];
            const isNote = field.key === "note";
            // Treat numeric strings ("35") the same as numbers (35).
            // The AI sometimes returns values as strings even when the schema asks for numbers,
            // and we don't want the unit suffix or formatting to break in that case.
            const numericVal = typeof val === "number" ? val : Number(val);
            const isNumeric = !isNote && val !== "" && val !== null && val !== undefined && Number.isFinite(numericVal);
            const isText = !isNumeric;
            return (
              <div key={field.key} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: isNote ? "flex-start" : "center",
                padding: "10px 16px", borderBottom: "1px solid #0C1828",
                background: i % 2 === 0 ? "transparent" : "rgba(5,11,18,0.6)", gap: "16px",
              }}>
                <span style={{ fontSize: "13px", color: isNote ? "#FFD200" : "#486882", flexShrink: 0, paddingTop: isNote ? "2px" : 0 }}>{field.label}</span>
                <span style={{
                  fontSize: isText ? "12px" : "15px",
                  fontWeight: isText ? "400" : "700",
                  color: isText ? (isNote ? "#88A8C0" : "#7AAAC8") : "#E8F2FF",
                  textAlign: "right", maxWidth: isNote ? "70%" : "auto",
                  fontStyle: isNote ? "italic" : "normal",
                }}>
                  {isNumeric ? numericVal : val}{field.unit && isNumeric ? ` ${field.unit}` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const StatBar = ({ label, value, max = 10 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
      <span style={{ fontSize: "13px", color: "#486882", letterSpacing: "0.1em", width: "70px", flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: "4px", background: "#0E1E32", borderRadius: "1px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: "linear-gradient(90deg,#00B4FF,#5BD1FF)" }} />
      </div>
      <span style={{ fontSize: "12px", color: "#C8DCF0", width: "26px", textAlign: "right", fontWeight: "700" }}>{value.toFixed(1)}</span>
    </div>
  );

  const ClassBadge = ({ cls, pi }) => {
    const meta = CLASSES.find(c => c.id === cls) || CLASSES[0];
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", border: `1px solid ${meta.color}66`, background: `${meta.color}11`, borderRadius: "2px" }}>
        <span style={{ fontSize: "13px", fontWeight: "700", color: meta.color, letterSpacing: "0.1em" }}>{cls}</span>
        <span style={{ fontSize: "15px", fontWeight: "700", color: "#E8F2FF" }}>{pi}</span>
      </div>
    );
  };

  if (pwGate) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #050B16 0%, #080F1E 100%)", color: "#E8F2FF", fontFamily: "'Rajdhani', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 420, padding: "32px 28px", background: "#080F1E", border: "1px solid #1A3050", borderTop: "2px solid #00B4FF", borderRadius: 2 }}>
          <div style={{ fontSize: 11, color: "#00B4FF", letterSpacing: "0.2em", fontWeight: 700, marginBottom: 12 }}>FH6 TUNING AGENT</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0", color: "#E8F2FF" }}>Friends-Only Access</h1>
          <p style={{ fontSize: 13, color: "#88A8C0", margin: "0 0 24px 0", lineHeight: 1.5 }}>Enter the password to use the tuning agent. If you don't have one, ask Voycheck.</p>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submitPassword(); }}
            placeholder="Password"
            autoFocus
            style={{ width: "100%", padding: "12px 14px", fontSize: 14, background: "#050B16", border: "1px solid #1A3050", color: "#E8F2FF", borderRadius: 2, outline: "none", marginBottom: 12, fontFamily: "inherit" }}
          />
          {pwError && (
            <div style={{ fontSize: 12, color: "#FF5E8C", marginBottom: 12 }}>{pwError}</div>
          )}
          <button
            onClick={submitPassword}
            style={{ width: "100%", padding: "12px 16px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", background: "#00B4FF", color: "#050B16", border: "none", borderRadius: 2, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}
          >
            Continue
          </button>

          {/* Secondary path for visitors without a password: browse what's already been built */}
          <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #152840", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#6890B0", marginBottom: 8, lineHeight: 1.5 }}>
              Don't have a password? You can still browse builds others have created.
            </div>
            <a
              href="/builds"
              style={{ fontSize: 13, color: "#00B4FF", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none" }}
            >
              BROWSE ALL BUILDS →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050B16", color: "#C8DCF0", fontFamily: FONT }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#04091A 0%,#071228 60%,#0A0E24 100%)", borderBottom: "2px solid #00B4FF", padding: isMobile ? "12px 14px" : "16px 32px", display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px", textDecoration: "none", color: "inherit" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#00B4FF22,#00B4FF44)", border: "1px solid #00B4FF55", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🏎</div>
          <div>
            <div style={{ fontSize: "13px", letterSpacing: "0.4em", color: "#00B4FF", fontWeight: "700", lineHeight: 1 }}>FORZA HORIZON 6</div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#E8F2FF", letterSpacing: "0.08em", marginTop: "2px" }}>BUILD & TUNING AGENT</div>
          </div>
        </a>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: isMobile ? "10px" : "20px" }}>
          {!isMobile && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", color: "#486882", letterSpacing: "0.1em" }}>{Object.keys(FH6_CARS).length} MAKES</div>
              <div style={{ fontSize: "12px", color: "#486882", letterSpacing: "0.1em" }}>{Object.values(FH6_CARS).reduce((a, b) => a + b.length, 0)} MODELS</div>
            </div>
          )}
          <a
            href="/builds"
            style={{
              display: "inline-block",
              padding: isMobile ? "8px 10px" : "10px 14px",
              background: "transparent",
              border: "1px solid #1A3050",
              color: "#7AAAC8",
              fontFamily: FONT,
              fontSize: isMobile ? "11px" : "12px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textDecoration: "none",
              borderRadius: "2px",
              whiteSpace: "nowrap",
            }}
          >
            BROWSE ALL →
          </a>
        </div>
      </div>

      {!build ? (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "16px 12px" : "28px 24px", display: "flex", flexDirection: "column", gap: isMobile ? "12px" : "16px" }}>

          {/* CAR SELECT */}
          <div style={CARD}>
            <div style={LBL}>SELECT YOUR CAR</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: isMobile ? "10px" : "16px" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#486882", marginBottom: "6px", letterSpacing: "0.1em" }}>Brand</div>
                <div style={{ position: "relative" }}>
                  <select value={make} onChange={handleMakeChange} style={SEL}>
                    <option value="">— Select Brand —</option>
                    {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#00B4FF", pointerEvents: "none", fontSize: "13px" }}>▼</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "13px", color: make ? "#486882" : "#1E3452", marginBottom: "6px", letterSpacing: "0.1em" }}>
                  Model {make && <span style={{ color: "#1E3452" }}>({models.length})</span>}
                </div>
                <div style={{ position: "relative" }}>
                  <select value={carKey} onChange={handleCarChange} disabled={!make} style={{ ...SEL, opacity: make ? 1 : 0.35, cursor: make ? "pointer" : "not-allowed" }}>
                    <option value="">{make ? "— Select Model —" : "— Select Brand First —"}</option>
                    {models.map(c => (
                      <option key={`${c.y}|${c.m}`} value={`${c.y}|${c.m}`}>
                        {c.y} {c.m} — {c.c} · {c.pi}
                      </option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: make ? "#00B4FF" : "#1E3452", pointerEvents: "none", fontSize: "13px" }}>▼</span>
                </div>
              </div>
            </div>

            {/* STOCK STATS */}
            {selectedCar && (
              <div style={{ marginTop: "16px", padding: "14px 16px", background: "#050B16", border: "1px solid #0E1E32", borderLeft: "3px solid #00B4FF", animation: "fadeIn 0.2s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", color: "#486882", letterSpacing: "0.2em" }}>STOCK SPEC</div>
                  <ClassBadge cls={selectedCar.c} pi={selectedCar.pi} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "4px 12px" : "6px 24px" }}>
                  <StatBar label="SPEED" value={selectedCar.sp} />
                  <StatBar label="HANDLING" value={selectedCar.ha} />
                  <StatBar label="ACCEL" value={selectedCar.ac} />
                  <StatBar label="LAUNCH" value={selectedCar.la} />
                  <StatBar label="BRAKING" value={selectedCar.br} />
                  <StatBar label="OFFROAD" value={selectedCar.of} />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", fontSize: "12px", color: "#486882", letterSpacing: "0.05em" }}>
                  <span>{selectedCar.co}</span>
                  <span style={{ color: "#FF5E8C" }}>{selectedCar.r}</span>
                  <span>{selectedCar.v.toLocaleString()} CR</span>
                </div>
              </div>
            )}
          </div>

          {/* TARGET CLASS */}
          <div style={CARD}>
            <div style={LBL}>TARGET CLASS</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(4,1fr)" : "repeat(7,1fr)", gap: "6px" }}>
              {CLASSES.map(c => {
                const active = targetClass === c.id;
                const isStock = selectedCar && selectedCar.c === c.id;
                return (
                  <button key={c.id} onClick={() => setTargetClass(c.id)} disabled={!selectedCar} style={{
                    padding: "12px 4px",
                    background: active ? c.color : "transparent",
                    border: active ? `1px solid ${c.color}` : "1px solid #152840",
                    color: active ? "#050B16" : (selectedCar ? c.color : "#1E3452"),
                    fontFamily: FONT, cursor: selectedCar ? "pointer" : "not-allowed",
                    transition: "all 0.12s", borderRadius: "2px", textAlign: "center",
                    opacity: selectedCar ? 1 : 0.4,
                    position: "relative",
                  }}>
                    <div style={{ fontSize: "16px", fontWeight: "700", letterSpacing: "0.05em" }}>{c.label}</div>
                    <div style={{ fontSize: "13px", marginTop: "2px", opacity: 0.8 }}>{c.range}</div>
                    {isStock && !active && <div style={{ position: "absolute", top: "3px", right: "4px", fontSize: "12px", color: "#FFD200", letterSpacing: "0.05em" }}>STOCK</div>}
                  </button>
                );
              })}
            </div>
            {selectedCar && targetClass && (
              <div style={{ marginTop: "10px", fontSize: "13px", color: "#7AAAC8", lineHeight: 1.5 }}>
                {(() => {
                  const gap = CLASS_PI_TOP[targetClass] - selectedCar.pi;
                  if (gap > 200) return `Big upgrade. ~+${gap} PI needed. Expect heavy engine + forced induction work.`;
                  if (gap > 80) return `Solid upgrade. ~+${gap} PI needed. Mix of Sport/Race tier parts across the board.`;
                  if (gap > 20) return `Light upgrade. ~+${gap} PI to reach top of class. Targeted Sport parts and tune.`;
                  if (gap > -20) return `Already near target. Tune-focused build to maximize class fit.`;
                  return `Downgrade build. Lower tier parts to stay under ${CLASS_PI_TOP[targetClass]} PI ceiling.`;
                })()}
              </div>
            )}
          </div>

          {/* DRIVING STYLE */}
          <div style={CARD}>
            <div style={LBL}>DRIVING STYLE</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: "8px" }}>
              {DRIVING_STYLES.map(s => (
                <button key={s.id} onClick={() => setStyle(s.id)} style={{
                  padding: "14px 8px",
                  background: style === s.id ? "#071E38" : "transparent",
                  border: style === s.id ? "1px solid #00B4FF" : "1px solid #152840",
                  cursor: "pointer", textAlign: "center", transition: "all 0.12s", borderRadius: "2px",
                }}>
                  <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: style === s.id ? "#E8F2FF" : "#7AAAC8", letterSpacing: "0.04em", lineHeight: 1.2 }}>{s.label}</div>
                  <div style={{ fontSize: "12px", color: style === s.id ? "#486882" : "#1E3452", marginTop: "4px", lineHeight: 1.3 }}>{s.desc}</div>
                  {style === s.id && <div style={{ width: "100%", height: "2px", background: "#00B4FF", marginTop: "8px", borderRadius: "1px" }} />}
                </button>
              ))}
            </div>
          </div>

          <div style={CARD}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "12px" : "24px" }}>
              <div>
                <div style={LBL}>TRACK TYPE</div>
                <div style={{ position: "relative" }}>
                  <select value={track} onChange={e => setTrack(e.target.value)} style={SEL}>
                    {TRACK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#00B4FF", pointerEvents: "none", fontSize: "13px" }}>▼</span>
                </div>
              </div>
              <div>
                <div style={LBL}>DRIVETRAIN</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {DRIVETRAINS.map(d => (
                    <button key={d} onClick={() => setDrivetrain(d)} style={{
                      flex: 1, padding: "10px 4px",
                      background: drivetrain === d ? "#00B4FF" : "transparent",
                      border: drivetrain === d ? "1px solid #00B4FF" : "1px solid #152840",
                      color: drivetrain === d ? "#050B16" : "#7AAAC8",
                      fontFamily: FONT, fontSize: "15px", letterSpacing: "0.12em",
                      cursor: "pointer", fontWeight: "700", transition: "all 0.12s", borderRadius: "2px",
                    }}>{d}</button>
                  ))}
                </div>
                <div style={{ fontSize: "12px", color: "#486882", marginTop: "6px", fontStyle: "italic" }}>
                  {drivetrain === "AUTO" ? "AI will pick the best drivetrain for your style and track." : "Override active. The build will use your selected drivetrain."}
                </div>
              </div>
            </div>
          </div>

          <button onClick={generateBuild} disabled={!canGenerate} style={{
            padding: loading ? "16px 16px 22px 16px" : "16px",
            background: canGenerate ? "#00B4FF" : (loading ? "#0A1A2A" : "#0A1220"),
            border: "none",
            color: canGenerate ? "#050B16" : (loading ? "#7AAAC8" : "#152840"),
            fontFamily: FONT, fontSize: "15px", letterSpacing: "0.3em",
            cursor: canGenerate ? "pointer" : (loading ? "wait" : "not-allowed"),
            fontWeight: "700", transition: "background 0.15s, color 0.15s", borderRadius: "2px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            position: "relative",
            overflow: "hidden",
          }}>
            <span>{loading ? "⚙" : "🔧"}</span>
            {loading ? "GENERATING BUILD" : `GENERATE ${targetClass || ""} BUILD`}
            {loading && (
              <>
                <span aria-hidden="true" style={{
                  position: "absolute",
                  left: 0, right: 0, bottom: "6px",
                  height: "2px",
                  background: "#00B4FF",
                  opacity: 0.3,
                  animation: "pulse-track 1.8s ease-in-out infinite",
                }} />
                <span aria-hidden="true" style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "-40px",
                  fontSize: "22px",
                  lineHeight: 1,
                  animation: "drive 2.4s linear infinite",
                  filter: "drop-shadow(0 0 6px rgba(0,180,255,0.5))",
                  transform: "scaleX(-1)",
                  display: "inline-block",
                }}>🏎</span>
              </>
            )}
          </button>

          {error && <div style={{ padding: "12px 16px", border: "1px solid #3A1A2E", borderLeft: "3px solid #FF5E8C", fontSize: "14px", color: "#FF5E8C", background: "#0D0814" }}>{error}</div>}
        </div>

      ) : (
        /* RESULTS LAYOUT */
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "300px minmax(560px, 760px) minmax(280px, 360px)", justifyContent: "center", minHeight: "calc(100vh - 74px)" }}>

          <div style={{ padding: isMobile ? "14px 12px" : "20px", borderRight: isMobile ? "none" : "1px solid #0E1E32", borderBottom: isMobile ? "1px solid #0E1E32" : "none", background: "#080F1E", display: "flex", flexDirection: "column", gap: isMobile ? "10px" : "12px", position: isMobile ? "static" : "sticky", top: 0, maxHeight: isMobile ? "none" : "calc(100vh - 74px)", alignSelf: "start", overflowY: isMobile ? "visible" : "auto" }}>

            {/* Combined Vehicle + PI Trajectory card */}
            <div style={{ padding: "14px", background: "#050B16", border: "1px solid #0E1E32", borderLeft: "3px solid #FF5E8C" }}>
              <div style={{ fontSize: "13px", color: "#486882", letterSpacing: "0.1em", marginBottom: "4px" }}>VEHICLE</div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#E8F2FF", lineHeight: 1.2 }}>{make}</div>
              <div style={{ fontSize: "15px", color: "#7AAAC8", marginTop: "2px" }}>{selectedCar?.y} {selectedCar?.m}</div>

              {selectedCar && (
                <>
                  <div style={{ height: "1px", background: "#0E1E32", margin: "12px 0 10px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px" }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "#486882", letterSpacing: "0.15em", marginBottom: "4px" }}>STOCK</div>
                      <ClassBadge cls={selectedCar.c} pi={selectedCar.pi} />
                    </div>
                    <div style={{ color: "#00B4FF", fontSize: "14px" }}>→</div>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "#486882", letterSpacing: "0.15em", marginBottom: "4px" }}>TARGET</div>
                      <ClassBadge cls={targetClass} pi={build.estimated_pi || CLASS_PI_TOP[targetClass] - 3} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: "12px 14px", background: "#050B16", border: "1px solid #0E1E32" }}>
              {[["DRIVETRAIN", drivetrain], ["STYLE", selectedStyle?.label], ["TRACK", track]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #0E1E32" }}>
                  <span style={{ fontSize: "13px", color: "#486882", letterSpacing: "0.15em" }}>{k}</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#C8DCF0" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Share Link button — appears once a build has been saved */}
            {buildId && (
              <div style={{ padding: "12px 14px", background: "#071220", border: "1px solid #1A3050", borderLeft: "3px solid #00B4FF" }}>
                <div style={{ fontSize: "13px", color: "#00B4FF", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "8px" }}>📋 SHARE THIS BUILD</div>
                <div style={{ fontSize: "12px", color: "#7AAAC8", marginBottom: "10px", lineHeight: 1.4 }}>
                  Save this build by copying its link. Anyone with the URL can view it.
                </div>
                <button
                  onClick={async () => {
                    const url = `${window.location.origin}/builds/${buildId}`;
                    try {
                      await navigator.clipboard.writeText(url);
                      setCopyStatus("copied");
                      setTimeout(() => setCopyStatus("idle"), 2000);
                    } catch (err) {
                      // Fallback: select an off-screen input
                      const ta = document.createElement("textarea");
                      ta.value = url;
                      document.body.appendChild(ta);
                      ta.select();
                      try { document.execCommand("copy"); setCopyStatus("copied"); setTimeout(() => setCopyStatus("idle"), 2000); }
                      catch {}
                      document.body.removeChild(ta);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: copyStatus === "copied" ? "#00FF88" : "#00B4FF",
                    border: "none",
                    color: "#050B16",
                    fontFamily: FONT,
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.15em",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    borderRadius: "2px",
                  }}
                >
                  {copyStatus === "copied" ? "✓ COPIED" : "COPY SHARE LINK"}
                </button>
              </div>
            )}

            {/* Forza tune code — only relevant when there's a saved build to attach to */}
            {buildId && (
              <div style={{ padding: "12px 14px", background: "#071220", border: "1px solid #1A3050", borderLeft: "3px solid #00FF88" }}>
                <div style={{ fontSize: "13px", color: "#00FF88", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "8px" }}>🎮 FORZA TUNE CODE</div>

                {/* Display existing code */}
                {forzaCode && !forzaCodeEditing && (
                  <>
                    <div style={{ fontSize: "12px", color: "#7AAAC8", marginBottom: "8px", lineHeight: 1.4 }}>
                      Paste this in-game to load the tune instantly:
                    </div>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ flex: 1, padding: "8px 10px", background: "#050B16", border: "1px solid #1A3050", fontFamily: "monospace", fontSize: "14px", color: "#E8F2FF", fontWeight: "700", letterSpacing: "0.05em", textAlign: "center" }}>
                        {forzaCode}
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(forzaCode);
                            setForzaCodeCopyStatus("copied");
                            setTimeout(() => setForzaCodeCopyStatus("idle"), 2000);
                          } catch {
                            const ta = document.createElement("textarea");
                            ta.value = forzaCode;
                            document.body.appendChild(ta);
                            ta.select();
                            try { document.execCommand("copy"); setForzaCodeCopyStatus("copied"); setTimeout(() => setForzaCodeCopyStatus("idle"), 2000); } catch {}
                            document.body.removeChild(ta);
                          }
                        }}
                        style={{ padding: "8px 12px", background: forzaCodeCopyStatus === "copied" ? "#00FF88" : "transparent", border: "1px solid #00FF88", color: forzaCodeCopyStatus === "copied" ? "#050B16" : "#00FF88", fontFamily: FONT, fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "2px" }}
                      >
                        {forzaCodeCopyStatus === "copied" ? "✓" : "COPY"}
                      </button>
                    </div>
                    <button
                      onClick={() => { setForzaCodeInput(forzaCode || ""); setForzaCodeEditing(true); setForzaCodeError(""); }}
                      style={{ background: "transparent", border: "none", color: "#486882", fontFamily: FONT, fontSize: "12px", letterSpacing: "0.1em", cursor: "pointer", padding: 0 }}
                    >
                      EDIT
                    </button>
                  </>
                )}

                {/* No code yet, not editing — show subtle prompt */}
                {!forzaCode && !forzaCodeEditing && (
                  <>
                    <div style={{ fontSize: "12px", color: "#7AAAC8", marginBottom: "8px", lineHeight: 1.4 }}>
                      No Forza code yet
                    </div>
                    <button
                      onClick={() => { setForzaCodeInput(""); setForzaCodeEditing(true); setForzaCodeError(""); }}
                      style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #00FF8855", color: "#00FF88", fontFamily: FONT, fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", cursor: "pointer", borderRadius: "2px" }}
                    >
                      + ADD CODE
                    </button>
                  </>
                )}

                {/* Editing mode — show input and save/cancel */}
                {forzaCodeEditing && (
                  <>
                    <div style={{ fontSize: "12px", color: "#7AAAC8", marginBottom: "8px", lineHeight: 1.4 }}>
                      Built this in Forza? Paste the share code:
                    </div>
                    <input
                      type="text"
                      value={forzaCodeInput}
                      onChange={(e) => setForzaCodeInput(e.target.value)}
                      placeholder="123 456 789"
                      style={{ width: "100%", padding: "8px 10px", background: "#050B16", border: "1px solid #1A3050", color: "#E8F2FF", fontFamily: "monospace", fontSize: "13px", marginBottom: "8px", outline: "none", borderRadius: "2px" }}
                      autoFocus
                    />
                    {forzaCodeError && (
                      <div style={{ fontSize: "12px", color: "#FF5E8C", marginBottom: "8px" }}>{forzaCodeError}</div>
                    )}
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        disabled={forzaCodeSaving}
                        onClick={async () => {
                          setForzaCodeSaving(true);
                          setForzaCodeError("");
                          try {
                            const res = await fetch("/api/update-forza-code", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ id: buildId, forzaCode: forzaCodeInput }),
                            });
                            const data = await res.json();
                            if (!res.ok) {
                              setForzaCodeError(data?.error || "Could not save code");
                              return;
                            }
                            setForzaCode(data.forzaCode);
                            setForzaCodeEditing(false);
                          } catch (err) {
                            setForzaCodeError("Network error. Try again.");
                          } finally {
                            setForzaCodeSaving(false);
                          }
                        }}
                        style={{ flex: 1, padding: "8px", background: "#00FF88", border: "none", color: "#050B16", fontFamily: FONT, fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", cursor: forzaCodeSaving ? "wait" : "pointer", borderRadius: "2px", opacity: forzaCodeSaving ? 0.6 : 1 }}
                      >
                        {forzaCodeSaving ? "SAVING..." : "SAVE"}
                      </button>
                      <button
                        disabled={forzaCodeSaving}
                        onClick={() => { setForzaCodeEditing(false); setForzaCodeError(""); }}
                        style={{ padding: "8px 12px", background: "transparent", border: "1px solid #152840", color: "#486882", fontFamily: FONT, fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "2px" }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {build.engine_swap_note && (
              <div style={{ padding: "12px 14px", background: "#071220", border: "1px solid #1A2A1A", borderLeft: "3px solid #FFD200", fontSize: "13px", color: "#88A8C0", lineHeight: 1.6 }}>
                <div style={{ fontSize: "13px", color: "#FFD200", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "6px" }}>⚡ ENGINE SWAP</div>
                {build.engine_swap_note}
              </div>
            )}

            <div style={{ padding: "12px 14px", background: "#050B16", border: "1px solid #0E1E32", fontSize: "13px", color: "#7AAAC8", lineHeight: 1.7, fontStyle: "italic", flexGrow: 1 }}>
              {build.summary}
            </div>

            <button onClick={() => {
              setBuild(null);
              setActiveUpgrade(null);
              setActiveTune(null);
              setBuildId(null);
              setCopyStatus("idle");
              setForzaCode(null);
              setForzaCodeInput("");
              setForzaCodeEditing(false);
              setForzaCodeError("");
              setForzaCodeCopyStatus("idle");
              // If user came in via a shared link and has no password, show the gate
              if (typeof window !== "undefined") {
                const stored = localStorage.getItem("fh6_pw");
                if (!stored) setPwGate(true);
                window.history.pushState({}, "", "/");
              }
            }} style={{
              padding: "10px", background: "transparent", border: "1px solid #152840",
              color: "#486882", fontFamily: FONT, fontSize: "13px",
              letterSpacing: "0.2em", cursor: "pointer", transition: "all 0.12s",
            }}>{initialBuild ? "MAKE YOUR OWN BUILD →" : "← NEW BUILD"}</button>
          </div>

          <div style={{ padding: isMobile ? "16px 12px" : "24px 28px", overflowY: "auto" }}>

            <div style={{ display: "flex", gap: "0", marginBottom: "20px", borderBottom: "1px solid #152840" }}>
              {[
                { id: "upgrades", label: "UPGRADES TO INSTALL", icon: "🛠" },
                { id: "tune", label: "TUNING SLIDERS", icon: "⚙" },
              ].map(t => (
                <button key={t.id} onClick={() => setView(t.id)} style={{
                  padding: isMobile ? "10px 8px" : "12px 20px",
                  background: view === t.id ? "#00B4FF" : "transparent",
                  border: "none",
                  borderBottom: view === t.id ? "2px solid #00B4FF" : "2px solid transparent",
                  color: view === t.id ? "#050B16" : "#486882",
                  fontFamily: FONT, fontSize: isMobile ? "10px" : "14px", fontWeight: "700",
                  letterSpacing: isMobile ? "0.05em" : "0.12em", cursor: "pointer", transition: "all 0.12s",
                  display: "flex", alignItems: "center", gap: isMobile ? "5px" : "8px",
                  flex: isMobile ? "1" : "0 0 auto",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}>
                  <span>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {view === "upgrades" && build.upgrades && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: "6px", marginBottom: "20px" }}>
                  {UPGRADE_SECTIONS.map(sec => (
                    <button key={sec.key} onClick={() => setActiveUpgrade(activeUpgrade === sec.key ? null : sec.key)} style={{
                      padding: "10px 6px",
                      background: activeUpgrade === sec.key ? "#00B4FF" : "#080F1E",
                      border: activeUpgrade === sec.key ? "1px solid #00B4FF" : "1px solid #152840",
                      color: activeUpgrade === sec.key ? "#050B16" : "#486882",
                      fontFamily: FONT, fontSize: "12px", letterSpacing: "0.08em",
                      cursor: "pointer", transition: "all 0.1s",
                      textAlign: "center", borderRadius: "2px",
                    }}>
                      <div style={{ fontSize: "16px", marginBottom: "3px" }}>{sec.icon}</div>
                      <div style={{ fontWeight: "700" }}>{sec.label.toUpperCase()}</div>
                    </button>
                  ))}
                </div>
                {activeUpgrade && renderSection(UPGRADE_SECTIONS, activeUpgrade, build.upgrades)}
              </>
            )}

            {view === "tune" && build.tune && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: "6px", marginBottom: "20px" }}>
                  {TUNE_SECTIONS.map(sec => (
                    <button key={sec.key} onClick={() => setActiveTune(activeTune === sec.key ? null : sec.key)} style={{
                      padding: "10px 6px",
                      background: activeTune === sec.key ? "#00B4FF" : "#080F1E",
                      border: activeTune === sec.key ? "1px solid #00B4FF" : "1px solid #152840",
                      color: activeTune === sec.key ? "#050B16" : "#486882",
                      fontFamily: FONT, fontSize: "12px", letterSpacing: "0.08em",
                      cursor: "pointer", transition: "all 0.1s",
                      textAlign: "center", borderRadius: "2px",
                    }}>
                      <div style={{ fontSize: "16px", marginBottom: "3px" }}>{sec.icon}</div>
                      <div style={{ fontWeight: "700" }}>{sec.label.toUpperCase()}</div>
                    </button>
                  ))}
                </div>
                {activeTune === "gearing" && build.upgrades?.drivetrain?.transmission && (
                  <div style={{ marginBottom: "12px", padding: "10px 14px", background: "#071220", border: "1px solid #1A3050", borderLeft: "3px solid #FFD200", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "#FFD200", letterSpacing: "0.15em", fontWeight: "700" }}>⚙ TRANSMISSION</span>
                    <span style={{ fontSize: "15px", color: "#E8F2FF", fontWeight: "700" }}>{build.upgrades.drivetrain.transmission}</span>
                  </div>
                )}
                {(() => {
                  if (!activeTune) return null;
                  const sectionData = build.tune?.[activeTune];
                  if (!sectionData) return null;
                  // Detect a "locked" section: every numeric field is null (note/text fields don't count)
                  const sec = TUNE_SECTIONS.find(s => s.key === activeTune);
                  const numericFields = sec.fields.filter(f => f.key !== "note");
                  const allNull = numericFields.every(f => sectionData[f.key] === null || sectionData[f.key] === undefined);
                  if (!allNull) return null;
                  const lockMsg = {
                    gearing: "Gearing requires a Sport transmission (final drive only) or Race/Drift transmission (full gears). This build keeps the stock transmission.",
                    alignment: "Alignment tuning (camber, toe, caster) requires Race, Rally, or Drift springs & dampers. This build keeps stock springs.",
                    antiroll_bars: "ARB sliders require Race antiroll bars. This build keeps stock ARBs.",
                    springs: "Spring rate and ride height require Race, Rally, or Drift springs & dampers. This build keeps stock springs.",
                    damping: "Rebound and bump damping require Race, Rally, or Drift springs & dampers. This build keeps stock springs.",
                    aero: "Aero downforce requires a race wing or bumper. This build doesn't install one.",
                    brakes: "Brake tuning requires the Race Brakes upgrade. This build keeps Stock or Sport brakes.",
                    differential: "Differential tuning requires at least a Sport diff (accel only) or Race/Rally/Drift diff (full). This build keeps the stock differential.",
                  }[activeTune];
                  if (!lockMsg) return null;
                  return (
                    <div style={{ marginBottom: "12px", padding: "10px 14px", background: "#071220", border: "1px solid #1A3050", borderLeft: "3px solid #FFD200", fontSize: "13px", color: "#88A8C0", lineHeight: 1.5 }}>
                      <span style={{ color: "#FFD200", fontWeight: "700", letterSpacing: "0.1em" }}>LOCKED:</span> {lockMsg}
                    </div>
                  );
                })()}
                {(activeTune === "springs" || activeTune === "aero") && build.tune?.[activeTune] && Object.values(build.tune[activeTune]).some(v => typeof v === "number") && (
                  <div style={{ marginBottom: "12px", padding: "10px 14px", background: "#071220", border: "1px solid #1A3050", borderLeft: "3px solid #FF5E8C", fontSize: "13px", color: "#88A8C0", lineHeight: 1.5 }}>
                    <span style={{ color: "#FF5E8C", fontWeight: "700", letterSpacing: "0.1em" }}>NOTE:</span> Values are % of your car's slider range, not raw numbers. {activeTune === "springs" ? "Spring rate and ride height bounds differ per car." : "Downforce bounds differ per car."} Open the in-game slider, then set it to the % shown.
                  </div>
                )}
                {activeTune && renderSection(TUNE_SECTIONS, activeTune, build.tune)}
              </>
            )}

            {/* Driver Notes: on mobile, render inline at the bottom of the content pane */}
            {isMobile && build.tips && (
              <div style={{ marginTop: "20px" }}>
                <div style={{ fontSize: "12px", letterSpacing: "0.25em", color: "#00B4FF", fontWeight: "700", marginBottom: "10px" }}>DRIVER NOTES</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                  {build.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "12px 14px", background: "#080F1E", border: "1px solid #0E1E32", borderLeft: "2px solid #00B4FF33" }}>
                      <span style={{ color: "#00B4FF", fontSize: "13px", fontWeight: "700", flexShrink: 0, marginTop: "1px" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: "14px", color: "#6890B0", lineHeight: 1.6 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop-only third column: Driver Notes pinned to the right */}
          {!isMobile && build.tips && (
            <div style={{
              padding: "24px 20px",
              borderLeft: "1px solid #0E1E32",
              background: "#06101E",
              overflowY: "auto",
              position: "sticky",
              top: 0,
              maxHeight: "calc(100vh - 74px)",
              alignSelf: "start",
            }}>
              <div style={{
                fontSize: "12px",
                letterSpacing: "0.25em",
                color: "#00B4FF",
                fontWeight: "700",
                marginBottom: "16px",
                paddingBottom: "10px",
                borderBottom: "1px solid #152840",
              }}>📝 DRIVER NOTES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {build.tips.map((tip, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: "10px",
                    padding: "12px 14px",
                    background: "#080F1E",
                    border: "1px solid #0E1E32",
                    borderLeft: "2px solid #00B4FF33",
                    borderRadius: "2px",
                  }}>
                    <span style={{
                      color: "#00B4FF",
                      fontSize: "13px",
                      fontWeight: "700",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#6890B0",
                      lineHeight: 1.6,
                    }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes drive {
          0%   { left: -40px; }
          100% { left: 100%; }
        }
        @keyframes pulse-track {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.55; }
        }
        select option { background: #080F1E; color: #C8DCF0; }
        select:focus { outline: none; border-color: #00B4FF !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #050B16; } ::-webkit-scrollbar-thumb { background: #152840; }
        button:hover:not(:disabled) { opacity: 0.88; }
      `}</style>
    </div>
  );
}