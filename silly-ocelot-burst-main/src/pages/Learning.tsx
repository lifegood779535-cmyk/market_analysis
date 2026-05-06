"use client";

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import { useTrading } from '@/hooks/useTrading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Lock, ArrowLeft, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';
import QuizDialog from '@/components/learning/QuizDialog';
import LessonViewer from '@/components/learning/LessonViewer';
import { cn } from '@/lib/utils';

const LEVELS = [
  { 
    id: 1, 
    title: 'Level 1: Market Foundations', 
    description: 'NSE, BSE, SEBI, NIFTY, SENSEX and basic terminology.', 
    xp: 500,
    content: [
      { title: "What is Stock Market?", text: "Stock market ek aisi jagah hai jahan companies ke shares kharide aur beche jaate hain. India me do main exchanges hain: NSE (National Stock Exchange) aur BSE (Bombay Stock Exchange)." },
      { title: "SEBI: The Watchdog", text: "SEBI (Securities and Exchange Board of India) market ka regulator hai. Yeh investors ke interests ko protect karta hai aur fraud rokta hai." },
      { title: "NIFTY & SENSEX", text: "NIFTY 50 NSE ki top 50 companies ka index hai. SENSEX BSE ki top 30 companies ka index hai. Inhe dekh kar hum market ka mood samajhte hain." },
      { title: "Bull vs Bear Market", text: "Bull market matlab jab prices upar ja rahe hon (Optimism). Bear market matlab jab prices niche gir rahe hon (Pessimism)." },
      { title: "LTP (Last Traded Price)", text: "LTP woh price hai jis par sabse aakhri trade hua hai. Yeh real-time price hota hai." }
    ],
    questions: [
      { id: 1, text: "NIFTY 50 me kitni companies hoti hain?", options: ["30", "50", "100", "500"], correct: 1 },
      { id: 2, text: "India me market regulator kaun hai?", options: ["RBI", "SEBI", "Government", "BSE"], correct: 1 },
      { id: 3, text: "Bull market ka kya matlab hai?", options: ["Prices falling", "Prices rising", "No change", "Market closed"], correct: 1 },
      { id: 4, text: "NSE ka full form kya hai?", options: ["National Stock Exchange", "New Stock Exchange", "National Share Exchange", "None"], correct: 0 },
      { id: 5, text: "SENSEX kis exchange ka index hai?", options: ["NSE", "BSE", "MCX", "NCDEX"], correct: 1 },
      { id: 6, text: "LTP ka full form kya hai?", options: ["Last Time Price", "Last Traded Price", "Low Trade Price", "None"], correct: 1 },
      { id: 7, text: "Bear market me prices kahan jaate hain?", options: ["Upar", "Niche", "Sideways", "Upar-Niche"], correct: 1 },
      { id: 8, text: "Blue Chip companies kya hoti hain?", options: ["Small companies", "Large & Stable companies", "New companies", "Penny stocks"], correct: 1 },
      { id: 9, text: "Market kab khulta hai (Equity)?", options: ["9:00 AM", "9:15 AM", "10:00 AM", "3:30 PM"], correct: 1 },
      { id: 10, text: "Market kab band hota hai?", options: ["3:15 PM", "3:30 PM", "4:00 PM", "5:00 PM"], correct: 1 }
    ]
  },
  { 
    id: 2, 
    title: 'Level 2: Candlestick Masterclass (Part 1)', 
    description: 'Hammer, Shooting Star, Inverted Hammer, Hanging Man and more.', 
    xp: 1000,
    content: [
      { title: "The Hammer", text: "Hammer downtrend ke end me banta hai. Iska body chota aur lower wick lamba hota hai. Yeh bullish reversal signal hai.", visualType: 'hammer' },
      { title: "Shooting Star", text: "Shooting Star uptrend ke top par banti hai. Iska body niche aur upper wick lamba hota hai. Yeh bearish reversal signal hai.", visualType: 'shooting-star' },
      { title: "Inverted Hammer", text: "Yeh downtrend me banta hai, body niche aur upper wick lamba. Yeh potential reversal dikhata hai.", visualType: 'inverted-hammer' },
      { title: "Hanging Man", text: "Uptrend ke top par Hammer jaisa dikhne wala candle Hanging Man kehlata hai. Yeh bearish signal hai.", visualType: 'hanging-man' },
      { title: "Bullish Marubozu", text: "Bina wick wali badi green candle. Iska matlab hai buyers bahut strong hain.", visualType: 'marubozu-bull' },
      { title: "Bearish Marubozu", text: "Bina wick wali badi red candle. Iska matlab hai sellers market control kar rahe hain.", visualType: 'marubozu-bear' },
      { title: "Spinning Top", text: "Chota body aur dono taraf lambe wicks. Yeh market me indecision (confusion) dikhata hai.", visualType: 'spinning-top' }
    ],
    questions: [
      { id: 1, text: "Hammer candle kahan banti hai?", options: ["Top of uptrend", "Bottom of downtrend", "Sideways", "Everywhere"], correct: 1 },
      { id: 2, text: "Shooting Star ka wick kahan hota hai?", options: ["Niche", "Upar", "Dono taraf", "Kahin nahi"], correct: 1 },
      { id: 3, text: "Marubozu candle me wick hoti hai?", options: ["Haan", "Nahi", "Kabhi kabhi", "Sirf niche"], correct: 1 },
      { id: 4, text: "Spinning top kya dikhata hai?", options: ["Strong Buy", "Strong Sell", "Indecision", "Breakout"], correct: 2 },
      { id: 5, text: "Hanging man kaisa signal hai?", options: ["Bullish", "Bearish", "Neutral", "None"], correct: 1 },
      { id: 6, text: "Hammer ka lower wick body se kitna bada hona chahiye?", options: ["Same size", "At least 2x", "Chota", "None"], correct: 1 },
      { id: 7, text: "Bullish Marubozu ka color kya hota hai?", options: ["Red", "Green", "Yellow", "Blue"], correct: 1 },
      { id: 8, text: "Inverted Hammer kahan banta hai?", options: ["Uptrend top", "Downtrend bottom", "Sideways", "None"], correct: 1 },
      { id: 9, text: "Candlestick chart kisne invent kiya tha?", options: ["Americans", "Japanese", "Indians", "Chinese"], correct: 1 },
      { id: 10, text: "Doji candle ka opening aur closing price kaisa hota hai?", options: ["Very different", "Almost same", "Zero", "None"], correct: 1 }
    ]
  },
  { 
    id: 3, 
    title: 'Level 3: Advanced Chart Patterns', 
    description: 'Cup & Handle, Triangles, Wedges and Flags.', 
    xp: 1500,
    content: [
      { title: "Cup and Handle", text: "Yeh ek bullish continuation pattern hai. Pehle ek 'U' shape banta hai (Cup) aur phir ek chota consolidation (Handle).", visualType: 'cup-handle' },
      { title: "Ascending Triangle", text: "Upar ek flat resistance aur niche se higher lows. Yeh bullish breakout ka signal hai.", visualType: 'ascending-triangle' },
      { title: "Descending Triangle", text: "Niche ek flat support aur upar se lower highs. Yeh bearish breakdown ka signal hai.", visualType: 'descending-triangle' },
      { title: "Bull Flag", text: "Ek sharp upmove (Pole) ke baad chota downward channel (Flag). Breakout par buying hoti hai." },
      { title: "Bear Flag", text: "Ek sharp downmove ke baad chota upward channel. Breakdown par selling hoti hai." },
      { title: "Double Top (M Pattern)", text: "Jab market do baar ek hi resistance se girta hai. Yeh bearish reversal hai." },
      { title: "Double Bottom (W Pattern)", text: "Jab market do baar ek hi support se uthta hai. Yeh bullish reversal hai." }
    ],
    questions: [
      { id: 1, text: "Cup and Handle kaisa pattern hai?", options: ["Bullish", "Bearish", "Neutral", "None"], correct: 0 },
      { id: 2, text: "Double Top kaisa dikhta hai?", options: ["W Shape", "M Shape", "V Shape", "L Shape"], correct: 1 },
      { id: 3, text: "Ascending triangle me resistance kaisa hota hai?", options: ["Sloping up", "Sloping down", "Flat", "None"], correct: 2 },
      { id: 4, text: "Bull flag me 'Pole' kya hota hai?", options: ["Consolidation", "Sharp upmove", "Support", "Resistance"], correct: 1 },
      { id: 5, text: "Double Bottom kahan banta hai?", options: ["Resistance par", "Support par", "Sideways me", "None"], correct: 1 },
      { id: 6, text: "Descending triangle me breakdown kahan hota hai?", options: ["Upar", "Niche", "Kahin bhi", "None"], correct: 1 },
      { id: 7, text: "W pattern ka dusra naam kya hai?", options: ["Double Top", "Double Bottom", "Triple Top", "None"], correct: 1 },
      { id: 8, text: "Chart patterns kis par based hote hain?", options: ["News", "Price Action", "Indicators", "Luck"], correct: 1 },
      { id: 9, text: "Head and Shoulders kaisa pattern hai?", options: ["Continuation", "Reversal", "Neutral", "None"], correct: 1 },
      { id: 10, text: "Symmetrical triangle me breakout kahan hota hai?", options: ["Sirf upar", "Sirf niche", "Dono taraf ho sakta hai", "None"], correct: 2 }
    ]
  },
  { 
    id: 4, 
    title: 'Level 4: Technical Indicators Deep Dive', 
    description: 'RSI, MACD, Bollinger Bands and VWAP.', 
    xp: 2000,
    content: [
      { title: "RSI (Relative Strength Index)", text: "RSI momentum batata hai. 70+ matlab Overbought (Becho), 30- matlab Oversold (Kharido)." },
      { title: "MACD (Moving Average Convergence Divergence)", text: "Jab MACD line signal line ko niche se cross kare, toh yeh Buy signal hai.", visualType: 'macd' },
      { title: "Bollinger Bands", text: "Yeh volatility measure karta hai. Price aksar bands ke beech me rehta hai." },
      { title: "VWAP (Volume Weighted Average Price)", text: "Intraday traders ka sabse bada dost. Price VWAP ke upar hai toh Bullish, niche hai toh Bearish." },
      { title: "Moving Averages (EMA vs SMA)", text: "EMA (Exponential) latest price ko zyada weight deta hai, isliye yeh fast hota hai." }
    ],
    questions: [
      { id: 1, text: "RSI 80 par hai, toh market kya hai?", options: ["Oversold", "Overbought", "Neutral", "None"], correct: 1 },
      { id: 2, text: "MACD me crossover kab bullish hota hai?", options: ["Upar se niche", "Niche se upar", "Sideways", "None"], correct: 1 },
      { id: 3, text: "VWAP kis trading ke liye best hai?", options: ["Long term", "Intraday", "Swing", "None"], correct: 1 },
      { id: 4, text: "Bollinger bands squeeze kya dikhata hai?", options: ["High volatility", "Low volatility", "No trend", "None"], correct: 1 },
      { id: 5, text: "EMA aur SMA me fast kaunsa hai?", options: ["SMA", "EMA", "Dono same", "None"], correct: 1 },
      { id: 6, text: "RSI ka full form kya hai?", options: ["Relative Strength Index", "Real Strength Index", "Relative Stock Index", "None"], correct: 0 },
      { id: 7, text: "Golden Cross kab hota hai?", options: ["50 EMA crosses 200 EMA up", "200 EMA crosses 50 EMA up", "Price crosses VWAP", "None"], correct: 0 },
      { id: 8, text: "Death Cross kaisa signal hai?", options: ["Bullish", "Bearish", "Neutral", "None"], correct: 1 },
      { id: 9, text: "Indicators hamesha sahi hote hain?", options: ["Haan", "Nahi", "Sirf profit dete hain", "None"], correct: 1 },
      { id: 10, text: "Lagging indicator ka kya matlab hai?", options: ["Price se pehle batata hai", "Price ke baad batata hai", "Price ke saath chalta hai", "None"], correct: 1 }
    ]
  },
  { 
    id: 5, 
    title: 'Level 5: Support & Resistance Secrets', 
    description: 'Supply/Demand zones, Trendlines and Breakouts.', 
    xp: 2500,
    content: [
      { title: "Support & Resistance", text: "Support woh floor hai jahan se price bounce karta hai. Resistance woh chhat hai jahan se price girta hai." },
      { title: "Supply & Demand Zones", text: "Zones single line se behtar hote hain. Demand zone me buyers baithe hote hain, Supply zone me sellers." },
      { title: "Trendlines", text: "Upar jaate market me lows ko connect karo (Uptrend line). Niche jaate market me highs ko connect karo (Downtrend line)." },
      { title: "Fake Breakouts (Bull/Bear Traps)", text: "Jab price level todta hai par wapas andar aa jata hai. Isse bachne ke liye volume check karein." }
    ],
    questions: [
      { id: 1, text: "Support par kya karna chahiye?", options: ["Sell", "Buy", "Wait", "None"], correct: 1 },
      { id: 2, text: "Resistance tootne par kya hota hai?", options: ["Price falls", "Price rises", "No change", "None"], correct: 1 },
      { id: 3, text: "Trendline draw karne ke liye kitne points chahiye?", options: ["1", "At least 2-3", "10", "None"], correct: 1 },
      { id: 4, text: "Fake breakout se kaise bachein?", options: ["News dekho", "Volume check karo", "Luck par chhodo", "None"], correct: 1 },
      { id: 5, text: "Demand zone me kaun hota hai?", options: ["Sellers", "Buyers", "Brokers", "None"], correct: 1 },
      { id: 6, text: "Supply zone me price kya karta hai?", options: ["Bounce", "Reject/Fall", "Sideways", "None"], correct: 1 },
      { id: 7, text: "Change of Polarity kya hai?", options: ["Support becomes Resistance", "Price reverses", "Market closes", "None"], correct: 0 },
      { id: 8, text: "Horizontal levels zyada strong hote hain ya trendlines?", options: ["Trendlines", "Horizontal levels", "Dono same", "None"], correct: 1 },
      { id: 9, text: "Breakout confirm kab hota hai?", options: ["Touch karte hi", "Candle closing ke baad", "Wick bante hi", "None"], correct: 1 },
      { id: 10, text: "Stop loss kahan lagana chahiye?", options: ["Level ke upar", "Level ke thoda niche", "Kahin bhi", "None"], correct: 1 }
    ]
  },
  { 
    id: 6, 
    title: 'Level 6: Multi-Candle Reversals', 
    description: 'Morning Star, Evening Star, Three White Soldiers and Tweezer patterns.', 
    xp: 3000,
    content: [
      { title: "Morning Star", text: "Downtrend ke end me 3 candles ka pattern. Pehli red, dusri choti (Doji/Star), teesri badi green. Yeh bullish reversal hai." },
      { title: "Evening Star", text: "Uptrend ke top par 3 candles ka pattern. Pehli green, dusri choti, teesri badi red. Yeh bearish reversal hai." },
      { title: "Three White Soldiers", text: "Teen badi green candles back-to-back. Yeh strong bullish momentum dikhata hai." },
      { title: "Three Black Crows", text: "Teen badi red candles back-to-back. Yeh strong bearish momentum dikhata hai." },
      { title: "Tweezer Tops & Bottoms", text: "Jab do candles ka high ya low bilkul same ho. Yeh reversal ka signal hota hai." }
    ],
    questions: [
      { id: 1, text: "Morning Star kahan banti hai?", options: ["Uptrend top", "Downtrend bottom", "Sideways", "None"], correct: 1 },
      { id: 2, text: "Evening Star me teesri candle kaisi honi chahiye?", options: ["Green", "Red", "Doji", "None"], correct: 1 },
      { id: 3, text: "Three White Soldiers kya dikhata hai?", options: ["Weakness", "Strong Bullishness", "Sideways", "None"], correct: 1 },
      { id: 4, text: "Tweezer Bottom me kya same hota hai?", options: ["Highs", "Lows", "Body size", "None"], correct: 1 },
      { id: 5, text: "Multi-candle patterns single candle se zyada reliable hote hain?", options: ["Haan", "Nahi", "Kahin nahi", "None"], correct: 0 },
      { id: 6, text: "Morning Star ki dusri candle kya dikhati hai?", options: ["Strong trend", "Indecision", "Breakout", "None"], correct: 1 },
      { id: 7, text: "Three Black Crows ke baad market kahan ja sakta hai?", options: ["Upar", "Niche", "Wahin rahega", "None"], correct: 1 },
      { id: 8, text: "Star candle ka color Morning Star me matter karta hai?", options: ["Haan", "Nahi", "Sirf red", "None"], correct: 1 },
      { id: 9, text: "Tweezer Top kaisa signal hai?", options: ["Bullish", "Bearish", "Neutral", "None"], correct: 1 },
      { id: 10, text: "In patterns ko confirm karne ke liye kya chahiye?", options: ["Next candle closing", "News", "Luck", "None"], correct: 0 }
    ]
  },
  { 
    id: 7, 
    title: 'Level 7: Fibonacci & Gaps', 
    description: 'Fibonacci Retracements, Extensions and Gap types.', 
    xp: 3500,
    content: [
      { title: "Fibonacci Retracement", text: "Market kabhi seedha upar nahi jata. Woh thoda niche aata hai (Retrace). 0.5 aur 0.618 levels sabse important hote hain." },
      { title: "Breakaway Gap", text: "Jab market kisi bade level ko gap ke saath todta hai. Yeh trend ki shuruat hoti hai." },
      { title: "Runaway Gap", text: "Trend ke beech me aane wala gap. Yeh dikhata hai ki trend abhi aur chalega." },
      { title: "Exhaustion Gap", text: "Trend ke end me aane wala gap. Iske baad reversal aa sakta hai." }
    ],
    questions: [
      { id: 1, text: "Fibonacci me sabse important level kaunsa hai?", options: ["0.1", "0.618", "0.9", "None"], correct: 1 },
      { id: 2, text: "Breakaway gap kab aata hai?", options: ["Trend end me", "Level breakout par", "Trend ke beech me", "None"], correct: 1 },
      { id: 3, text: "Exhaustion gap ke baad kya ho sakta hai?", options: ["Trend continue", "Reversal", "Sideways", "None"], correct: 1 },
      { id: 4, text: "Fibonacci tool kahan se kahan draw karte hain?", options: ["High to Low", "Low to High", "Dono (Trend ke hisab se)", "None"], correct: 2 },
      { id: 5, text: "Gap fill hone ka kya matlab hai?", options: ["Price gap area me wapas aa gaya", "Market band ho gaya", "New high ban gaya", "None"], correct: 0 },
      { id: 6, text: "Runaway gap ko aur kya kehte hain?", options: ["Measuring Gap", "Closing Gap", "Fake Gap", "None"], correct: 0 },
      { id: 7, text: "Fibonacci levels support/resistance ki tarah kaam karte hain?", options: ["Haan", "Nahi", "Sirf news me", "None"], correct: 0 },
      { id: 8, text: "Common gap aksar fill ho jate hain?", options: ["Haan", "Nahi", "Kabhi nahi", "None"], correct: 0 },
      { id: 9, text: "Fibonacci sequence kisne discover kiya?", options: ["Einstein", "Leonardo Fibonacci", "Newton", "None"], correct: 1 },
      { id: 10, text: "0.5 level Fibonacci sequence ka part hai?", options: ["Haan", "Nahi (Par trading me use hota hai)", "Sirf options me", "None"], correct: 1 }
    ]
  },
  { 
    id: 8, 
    title: 'Level 8: Options Trading 101', 
    description: 'CE, PE, Strike Price, Expiry and Moneyness.', 
    xp: 4000,
    content: [
      { title: "What are Options?", text: "Options ek contract hain. CE (Call Option) tab kharidein jab market upar jaye. PE (Put Option) tab jab market niche jaye." },
      { title: "Strike Price", text: "Woh price jis par aap contract buy/sell kar rahe hain. Jaise NIFTY 22400 CE." },
      { title: "Expiry", text: "Options ki ek life hoti hai. Weekly ya Monthly expiry par contract zero ya profitable ho jata hai." },
      { title: "ITM, ATM, OTM", text: "In-The-Money (ITM) me value hoti hai. At-The-Money (ATM) current price ke paas hota hai. Out-Of-The-Money (OTM) sasta hota hai par risky." }
    ],
    questions: [
      { id: 1, text: "Market upar jane par kya buy karna chahiye?", options: ["PE", "CE", "Futures", "None"], correct: 1 },
      { id: 2, text: "PE ka full form kya hai?", options: ["Price Entry", "Put Option", "Profit Exit", "None"], correct: 1 },
      { id: 3, text: "Expiry par OTM options ki value kya hoti hai?", options: ["Double", "Zero", "Same", "None"], correct: 1 },
      { id: 4, text: "ATM ka matlab kya hai?", options: ["At The Money", "All Time Money", "Auto Trade Mode", "None"], correct: 0 },
      { id: 5, text: "Options me 'Lot Size' kya hota hai?", options: ["Minimum quantity", "Maximum profit", "Brokerage", "None"], correct: 0 },
      { id: 6, text: "NIFTY ki weekly expiry kab hoti hai?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correct: 3 },
      { id: 7, text: "ITM options OTM se saste hote hain?", options: ["Haan", "Nahi", "Dono same", "None"], correct: 1 },
      { id: 8, text: "Option buying me risk kitna hota hai?", options: ["Unlimited", "Limited (Premium paid)", "Zero", "None"], correct: 1 },
      { id: 9, text: "Option selling me margin zyada chahiye?", options: ["Haan", "Nahi", "Sirf expiry par", "None"], correct: 0 },
      { id: 10, text: "Time decay (Theta) kiske liye bura hai?", options: ["Option Seller", "Option Buyer", "Broker", "None"], correct: 1 }
    ]
  },
  { 
    id: 9, 
    title: 'Level 9: Options Greeks & Spreads', 
    description: 'Delta, Theta, Vega and basic Option Spreads.', 
    xp: 4500,
    content: [
      { title: "Delta", text: "Yeh batata hai ki NIFTY ₹1 badhne par option kitna badhega. ITM ka delta high hota hai." },
      { title: "Theta (Time Decay)", text: "Option buyer ka sabse bada dushman. Har din option ki value kam hoti jati hai." },
      { title: "Vega", text: "Volatility badhne par option price badhta hai. Isse Vega kehte hain." },
      { title: "Bull Call Spread", text: "Ek CE buy karna aur ek door ka CE sell karna. Isse risk kam ho jata hai." }
    ],
    questions: [
      { id: 1, text: "Time decay ko kya kehte hain?", options: ["Delta", "Theta", "Vega", "Gamma"], correct: 1 },
      { id: 2, text: "Volatility kisse measure hoti hai?", options: ["Delta", "Vega", "Theta", "None"], correct: 1 },
      { id: 3, text: "ATM option ka Delta kitna hota hai?", options: ["0.1", "0.5", "1.0", "None"], correct: 1 },
      { id: 4, text: "Spreads kyun use karte hain?", options: ["Risk badhane ke liye", "Risk kam karne ke liye", "Brokerage bachane ke liye", "None"], correct: 1 },
      { id: 5, text: "Gamma kya batata hai?", options: ["Price change", "Delta change rate", "Time decay", "None"], correct: 1 },
      { id: 6, text: "Option seller ko Theta se profit hota hai?", options: ["Haan", "Nahi", "Sirf loss hota hai", "None"], correct: 0 },
      { id: 7, text: "Deep ITM ka Delta kitna hota hai?", options: ["0", "0.5", "Close to 1", "None"], correct: 2 },
      { id: 8, text: "Vega kab high hota hai?", options: ["News/Event se pehle", "Market band hone par", "Expiry ke baad", "None"], correct: 0 },
      { id: 9, text: "Bear Put Spread kab use karte hain?", options: ["Bullish market", "Bearish market", "Sideways", "None"], correct: 1 },
      { id: 10, text: "Hedging ka kya matlab hai?", options: ["Gambling", "Risk protection", "Overtrading", "None"], correct: 1 }
    ]
  },
  { 
    id: 10, 
    title: 'Level 10: Professional Trading Systems', 
    description: 'Risk-Reward, Position Sizing and Trading Psychology.', 
    xp: 5000,
    content: [
      { title: "Risk-Reward Ratio (RRR)", text: "Hamesha kam se kam 1:2 RRR rakho. Matlab ₹1000 risk par ₹2000 profit target." },
      { title: "Position Sizing", text: "Apne capital ke hisab se quantity decide karo. Saara paisa ek trade me mat lagao." },
      { title: "Trading Journal", text: "Har trade likho. Kyun liya? Kya galti hui? Yeh aapko behtar banayega." },
      { title: "Psychology: FOMO & Revenge", text: "Darr aur lalach se bacho. Discipline hi trading me success ki chabi hai." }
    ],
    questions: [
      { id: 1, text: "Best Risk-Reward ratio kya hai?", options: ["1:1", "1:2 or higher", "2:1", "None"], correct: 1 },
      { id: 2, text: "Position sizing kis par depend karti hai?", options: ["Luck", "Stop Loss & Risk per trade", "News", "None"], correct: 1 },
      { id: 3, text: "FOMO ka full form kya hai?", options: ["Fear Of Missing Out", "Fast Order Money Out", "Fear Of Market Open", "None"], correct: 0 },
      { id: 4, text: "Trading journal kyun zaroori hai?", options: ["Tax ke liye", "Mistakes se seekhne ke liye", "Broker ko dikhane ke liye", "None"], correct: 1 },
      { id: 5, text: "Revenge trading se kya hota hai?", options: ["Bada profit", "Bada loss", "Account safe", "None"], correct: 1 },
      { id: 6, text: "Ek trade me max kitna capital risk karna chahiye?", options: ["1-2%", "10-20%", "50%", "100%"], correct: 0 },
      { id: 7, text: "Trading plan kab banana chahiye?", options: ["Trade lene ke baad", "Market khulne se pehle", "Loss hone par", "None"], correct: 1 },
      { id: 8, text: "Overtrading se kaise bachein?", options: ["Daily trade limit set karke", "Zyada indicators laga kar", "News dekh kar", "None"], correct: 0 },
      { id: 9, text: "Patience trading me zaroori hai?", options: ["Haan", "Nahi", "Sirf scalping me", "None"], correct: 0 },
      { id: 10, text: "Aap ek professional trader kab bante hain?", options: ["Jab bada profit ho", "Jab aap disciplined hon", "Jab aapke paas setup ho", "None"], correct: 1 }
    ]
  }
];

const Learning = () => {
  const { level, xp, completedLevelIds, completeLevel } = useTrading();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState<typeof LEVELS[0] | null>(null);
  const [view, setView] = useState<'list' | 'lesson'>('list');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleComplete = () => {
    if (activeLevel) {
      completeLevel(activeLevel.id, activeLevel.xp);
      showSuccess(`Level ${activeLevel.id} completed! You earned ${activeLevel.xp} XP! 🎉`);
      setView('list');
      setActiveLevel(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 p-6 lg:p-10 mt-16 lg:mt-0">
        {view === 'list' ? (
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <h1 className="text-4xl font-bold tracking-tight">Learning Academy</h1>
                <p className="text-slate-400 text-lg">Master the markets with structured courses.</p>
              </div>
              <div className="w-full md:w-72 p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#00D09C] uppercase tracking-widest">Level {level}</span>
                  <span className="text-[10px] text-slate-500 font-bold">{xp} / {level * 1000} XP</span>
                </div>
                <Progress value={(xp / (level * 1000)) * 100} className="h-2 bg-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {LEVELS.map((l) => {
                const isCompleted = completedLevelIds.includes(l.id);
                const isLocked = l.id > level && !isCompleted;

                return (
                  <Card key={l.id} className={cn(
                    "border-slate-800 bg-slate-900 transition-all overflow-hidden rounded-[2rem]",
                    isLocked ? "opacity-50" : "hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/5"
                  )}>
                    <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-8">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                        isCompleted ? "bg-[#00D09C]/10 text-[#00D09C]" : 
                        isLocked ? "bg-slate-800 text-slate-600" : "bg-blue-500/10 text-blue-400"
                      )}>
                        {isCompleted ? <CheckCircle2 size={32} /> : isLocked ? <Lock size={32} /> : <GraduationCap size={32} />}
                      </div>
                      <div className="flex-1 text-center sm:text-left space-y-1">
                        <h3 className="text-xl font-bold text-white">{l.title}</h3>
                        <p className="text-slate-400">{l.description}</p>
                      </div>
                      <div className="text-center sm:text-right w-full sm:w-auto space-y-4">
                        <div className="flex flex-col items-center sm:items-end">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reward</span>
                          <span className="text-lg font-bold text-yellow-500">{l.xp} XP</span>
                        </div>
                        {!isLocked && !isCompleted && (
                          <Button 
                            onClick={() => {
                              setActiveLevel(l);
                              setView('lesson');
                            }}
                            className="w-full sm:w-auto bg-[#00D09C] hover:bg-[#00D09C]/90 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-emerald-500/10"
                          >
                            Start Course
                          </Button>
                        )}
                        {isCompleted && <Badge className="bg-[#00D09C]/10 text-[#00D09C] border-none px-4 py-2 rounded-lg font-bold">Completed</Badge>}
                        {isLocked && <Badge className="bg-slate-800 text-slate-500 border-none px-4 py-2 rounded-lg font-bold">Locked</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <Button 
              variant="ghost" 
              onClick={() => setView('list')}
              className="text-slate-400 hover:text-white -ml-4"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Academy
            </Button>

            {activeLevel && (
              <LessonViewer 
                title={activeLevel.title}
                content={activeLevel.content}
                onStartQuiz={() => setIsQuizOpen(true)}
              />
            )}
          </div>
        )}

        {activeLevel && (
          <QuizDialog 
            isOpen={isQuizOpen}
            onClose={() => setIsQuizOpen(false)}
            levelTitle={activeLevel.title}
            questions={activeLevel.questions}
            onComplete={handleComplete}
          />
        )}
      </main>
    </div>
  );
};

export default Learning;