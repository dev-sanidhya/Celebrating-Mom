"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Gift, Sparkles, Star, Cake, Flower2, PartyPopper, Crown } from "lucide-react"

export default function MomBirthdayWebsite() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showGames, setShowGames] = useState(false)
  const [currentGame, setCurrentGame] = useState<number | null>(null)
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Game 1: Birthday Surprise Game
  const [noClickCount, setNoClickCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [yesButtonSize, setYesButtonSize] = useState(1)

  // Game 2: Memory Matching Game
  const [gameCards, setGameCards] = useState<Array<{ id: number; icon: any; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [memoryGameComplete, setMemoryGameComplete] = useState(false)

  // Game 3: Love Counter
  const [loveCount, setLoveCount] = useState(0)
  const [showLoveMessage, setShowLoveMessage] = useState(false)

  const sections = ["Welcome", "Why You're Amazing", "Games", "Birthday Wishes"]

  const reasons = [
    "Your warm hugs that heal my soul instantly",
    "The way you believe in my dreams unconditionally",
    "Your magical cooking that tastes like pure love",
    "How you remember every precious moment of my life",
    "Your incredible strength that inspires me daily",
    "The gentle wisdom you share with endless patience",
    "Your radiant smile that brightens my darkest days",
    "How you make every celebration feel like a fairy tale",
    "Your boundless love that never asks for anything in return",
    "The way you celebrate my smallest victories with such joy",
  ]

  const noButtonTexts = [
    "No, not yet",
    "Seriously? No!",
    "Are you sure, Mom?",
    "Come on, beautiful!",
    "Really? Still no?",
    "Last chance to say no!",
    "You can't escape my love! 😄",
  ]

  const gameIcons = [Heart, Gift, Sparkles, Star, Cake, Flower2]

  // Floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts((prev) => [
        ...prev.slice(-10), // Keep only last 10 hearts
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
        },
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts((prev) =>
        prev
          .map((heart) => ({
            ...heart,
            y: heart.y - 2,
          }))
          .filter((heart) => heart.y > -50),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleNoClick = () => {
    setNoClickCount((prev) => {
      const newCount = prev + 1
      setYesButtonSize(1 + newCount * 0.5)
      return newCount
    })
  }

  const handleYesClick = () => {
    setGameComplete(true)
  }

  const resetGame1 = () => {
    setNoClickCount(0)
    setYesButtonSize(1)
    setGameComplete(false)
  }

  // Memory Game Functions
  useEffect(() => {
    if (currentGame === 2 && gameCards.length === 0) {
      initializeMemoryGame()
    }
  }, [currentGame])

  const initializeMemoryGame = () => {
    const cards = []
    for (let i = 0; i < 6; i++) {
      cards.push(
        { id: i * 2, icon: gameIcons[i], flipped: false, matched: false },
        { id: i * 2 + 1, icon: gameIcons[i], flipped: false, matched: false },
      )
    }
    setGameCards(cards.sort(() => Math.random() - 0.5))
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (gameCards[cardId].flipped || gameCards[cardId].matched) return

    const newCards = [...gameCards]
    newCards[cardId].flipped = true
    setGameCards(newCards)

    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setTimeout(() => {
        checkMatch(newFlipped)
      }, 1000)
    }
  }

  const checkMatch = (flipped: number[]) => {
    const [first, second] = flipped
    const newCards = [...gameCards]

    if (newCards[first].icon === newCards[second].icon) {
      newCards[first].matched = true
      newCards[second].matched = true
      setMatches(matches + 1)

      if (matches + 1 === 6) {
        setMemoryGameComplete(true)
      }
    } else {
      newCards[first].flipped = false
      newCards[second].flipped = false
    }

    setGameCards(newCards)
    setFlippedCards([])
  }

  const resetMemoryGame = () => {
    setGameCards([])
    setFlippedCards([])
    setMatches(0)
    setMemoryGameComplete(false)
    initializeMemoryGame()
  }

  const handleLoveClick = () => {
    setLoveCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 50) {
        setShowLoveMessage(true)
      }
      return newCount
    })
  }

  const resetLoveGame = () => {
    setLoveCount(0)
    setShowLoveMessage(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed text-pink-400 text-2xl pointer-events-none animate-pulse z-10"
          style={{
            left: heart.x,
            top: heart.y,
            transform: "translateX(-50%)",
          }}
        >
          💖
        </div>
      ))}

      {/* Elegant Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ec4899' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-200 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-8">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => {
                  setCurrentSection(index)
                  setShowGames(index === 2)
                  setCurrentGame(null)
                }}
                className={`text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full ${
                  currentSection === index
                    ? "text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg transform scale-105"
                    : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-24">
        {/* Welcome Section */}
        {currentSection === 0 && (
          <section className="min-h-screen flex items-center justify-center px-4 relative">
            <div className="text-center max-w-5xl mx-auto relative z-20">
              <div className="mb-12 relative">
                <div className="absolute inset-0 animate-ping">
                  <Crown className="w-24 h-24 text-yellow-400 mx-auto opacity-30" />
                </div>
                <Crown className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
              </div>

              <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 mb-8 animate-pulse">
                Happy Birthday
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 mb-12">
                Beautiful Mom! ✨
              </h2>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-200 mb-12">
                <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed font-medium">
                  Today we celebrate the most extraordinary woman in the universe - YOU!
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  This little corner of the internet is overflowing with love, joy, and all the reasons why you're
                  absolutely magical. ✨
                </p>
              </div>

              <div className="flex justify-center space-x-6 mb-8">
                <div className="animate-bounce">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
                <div className="animate-bounce delay-100">
                  <Sparkles className="w-12 h-12 text-purple-500" />
                </div>
                <div className="animate-bounce delay-200">
                  <Gift className="w-12 h-12 text-rose-500" />
                </div>
                <div className="animate-bounce delay-300">
                  <Cake className="w-12 h-12 text-pink-500" />
                </div>
              </div>

              <div className="text-lg text-gray-600 font-medium">
                Made with infinite love by your son,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-bold">
                  {" "}
                  Vasu 💕
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Why You're Amazing Section */}
        {currentSection === 1 && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-pulse" />
                <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                  Why You're My Queen 👑
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Here are just a few of the countless reasons why you're absolutely incredible...
                </p>
              </div>

              <div className="grid gap-8">
                {reasons.map((reason, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 bg-gradient-to-r from-white/90 to-pink-50/90 backdrop-blur-sm"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0 relative">
                          <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-full">
                            <Heart className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <p className="text-xl text-gray-700 font-medium leading-relaxed group-hover:text-gray-800 transition-colors">
                          {reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-16">
                <p className="text-lg text-gray-600 italic">
                  "And these are just the beginning... my love for you is infinite!"
                </p>
                <p className="text-pink-600 font-semibold mt-2">- Your loving Vasu 💖</p>
              </div>
            </div>
          </section>
        )}

        {/* Games Section */}
        {currentSection === 2 && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              {currentGame === null && (
                <>
                  <div className="text-center mb-16">
                    <PartyPopper className="w-20 h-20 text-pink-500 mx-auto mb-6 animate-bounce" />
                    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                      Birthday Games! 🎮
                    </h2>
                    <p className="text-xl text-gray-600">
                      Special games designed to make you smile and feel extra loved!
                    </p>
                  </div>

                  {/* Elegant Disclaimer */}
                  <Card className="mb-16 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-xl">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-yellow-400 p-3 rounded-full">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-yellow-800 mb-4">✨ Game Disclaimer ✨</h3>
                      <p className="text-yellow-700 text-lg leading-relaxed">
                        These games are crafted with pure love to make your special day even more magical! Play only
                        when you're ready to feel overwhelmed with love and joy! 💕
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-3 gap-10">
                    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 bg-gradient-to-br from-pink-50 to-rose-100">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6 relative">
                          <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-full mx-auto w-fit">
                            <PartyPopper className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Birthday Surprise</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Are you ready for your magical birthday surprise?
                        </p>
                        <Button
                          onClick={() => setCurrentGame(1)}
                          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Play Game ✨
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-pink-100">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6 relative">
                          <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full mx-auto w-fit">
                            <Heart className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Memory Match</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Match the pairs to unlock a loving message!
                        </p>
                        <Button
                          onClick={() => setCurrentGame(2)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Play Game 💖
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 bg-gradient-to-br from-rose-50 to-purple-100">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6 relative">
                          <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-rose-500 to-purple-500 p-4 rounded-full mx-auto w-fit">
                            <Sparkles className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Love Counter</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">Click to count how much you're loved!</p>
                        <Button
                          onClick={() => setCurrentGame(3)}
                          className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Play Game 💫
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {/* Game 1: Birthday Surprise */}
              {currentGame === 1 && !gameComplete && (
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-pink-200 max-w-2xl mx-auto">
                    <PartyPopper className="w-16 h-16 text-pink-500 mx-auto mb-8 animate-bounce" />
                    <h3 className="text-4xl font-bold text-gray-800 mb-12">
                      Are you ready for your birthday surprise?
                    </h3>

                    <div className="flex flex-col items-center space-y-8">
                      <Button
                        onClick={handleYesClick}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all duration-300 shadow-2xl"
                        style={{
                          transform: `scale(${yesButtonSize})`,
                          fontSize: `${Math.min(yesButtonSize * 16, 32)}px`,
                          padding: `${Math.min(yesButtonSize * 12, 24)}px ${Math.min(yesButtonSize * 24, 48)}px`,
                        }}
                      >
                        Yes! I'm Ready! 🎉
                      </Button>

                      {noClickCount < 6 && (
                        <Button
                          onClick={handleNoClick}
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                        >
                          {noButtonTexts[noClickCount] || "No, not yet"}
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => setCurrentGame(null)}
                    variant="outline"
                    className="mt-8 border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg"
                  >
                    Back to Games
                  </Button>
                </div>
              )}

              {/* Game 1 Complete */}
              {currentGame === 1 && gameComplete && (
                <div className="text-center">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-12 shadow-2xl border-2 border-pink-200 max-w-3xl mx-auto">
                    <div className="mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping">
                          <Crown className="w-24 h-24 text-yellow-400 mx-auto opacity-50" />
                        </div>
                        <Crown className="w-24 h-24 text-yellow-500 mx-auto animate-bounce" />
                      </div>
                    </div>

                    <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8">
                      🎉 Congratulations Beautiful Queen! 🎉
                    </h3>
                    <div className="bg-white/80 rounded-2xl p-8 mb-8">
                      <p className="text-2xl text-gray-700 mb-4 font-medium">
                        Your loving son Vasu will always keep you happy, cherished, and loved beyond measure!
                      </p>
                      <p className="text-xl text-gray-600">
                        You deserve all the joy, laughter, and magic in this world! ✨💕
                      </p>
                    </div>

                    <div className="flex justify-center space-x-6">
                      <Button
                        onClick={resetGame1}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Play Again 🎮
                      </Button>
                      <Button
                        onClick={() => setCurrentGame(null)}
                        variant="outline"
                        className="border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg"
                      >
                        Back to Games
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game 2: Memory Match */}
              {currentGame === 2 && !memoryGameComplete && (
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-pink-200 max-w-2xl mx-auto">
                    <Heart className="w-16 h-16 text-pink-500 mx-auto mb-8 animate-pulse" />
                    <h3 className="text-4xl font-bold text-gray-800 mb-6">Memory Match Game</h3>
                    <p className="text-xl text-gray-600 mb-12">Match the pairs to unlock a special message!</p>

                    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
                      {gameCards.map((card, index) => (
                        <button
                          key={index}
                          onClick={() => handleCardClick(index)}
                          className={`aspect-square rounded-xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                            card.flipped || card.matched
                              ? "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-300 transform scale-105"
                              : "bg-white border-gray-300 hover:border-pink-300 hover:scale-105"
                          }`}
                        >
                          {(card.flipped || card.matched) && <card.icon className="w-8 h-8 mx-auto text-pink-500" />}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-center space-x-6 mb-6">
                      <div className="bg-pink-100 px-4 py-2 rounded-full">
                        <p className="text-lg text-pink-700 font-semibold">Matches: {matches}/6</p>
                      </div>
                      <Button
                        onClick={resetMemoryGame}
                        variant="outline"
                        className="border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg bg-transparent"
                      >
                        Reset Game
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={() => setCurrentGame(null)}
                    variant="outline"
                    className="mt-8 border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg"
                  >
                    Back to Games
                  </Button>
                </div>
              )}

              {/* Game 2 Complete */}
              {currentGame === 2 && memoryGameComplete && (
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-2xl border-2 border-purple-200 max-w-3xl mx-auto">
                    <div className="mb-8 animate-pulse">
                      <Heart className="w-24 h-24 text-pink-500 mx-auto" />
                    </div>
                    <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-8">
                      Perfect Memory, Perfect Mom! 🧠💕
                    </h3>
                    <div className="bg-white/80 rounded-2xl p-8 mb-8">
                      <p className="text-2xl text-gray-700 font-medium">
                        Just like how you remember every precious detail about my life, you've matched all the pairs
                        perfectly!
                      </p>
                    </div>
                    <p className="text-lg text-gray-600 mb-8">- Your proud Vasu 💖</p>

                    <div className="flex justify-center space-x-6">
                      <Button
                        onClick={resetMemoryGame}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Play Again 🎮
                      </Button>
                      <Button
                        onClick={() => setCurrentGame(null)}
                        variant="outline"
                        className="border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg"
                      >
                        Back to Games
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game 3: Love Counter */}
              {currentGame === 3 && !showLoveMessage && (
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-pink-200 max-w-2xl mx-auto">
                    <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-8 animate-spin" />
                    <h3 className="text-4xl font-bold text-gray-800 mb-6">How Much Are You Loved?</h3>
                    <p className="text-xl text-gray-600 mb-12">Click the heart to count! (Reach 50 for a surprise!)</p>

                    <div className="mb-8">
                      <button
                        onClick={handleLoveClick}
                        className="text-8xl hover:scale-110 transition-transform duration-200 animate-pulse"
                      >
                        💖
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 mb-8">
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                        Love Count: {loveCount}
                      </div>
                    </div>

                    <div className="flex justify-center space-x-6">
                      <Button
                        onClick={resetLoveGame}
                        variant="outline"
                        className="border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg bg-transparent"
                      >
                        Reset Counter
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={() => setCurrentGame(null)}
                    variant="outline"
                    className="mt-8 border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg"
                  >
                    Back to Games
                  </Button>
                </div>
              )}

              {/* Game 3 Complete */}
              {currentGame === 3 && showLoveMessage && (
                <div className="text-center">
                  <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl p-12 shadow-2xl border-2 border-rose-200 max-w-3xl mx-auto">
                    <div className="mb-8">
                      <div className="text-8xl mb-4 animate-pulse">💖</div>
                      <div className="text-6xl animate-bounce">∞</div>
                    </div>
                    <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mb-8">
                      Infinite Love Unlocked! ∞💕
                    </h3>
                    <div className="bg-white/80 rounded-2xl p-8 mb-8">
                      <p className="text-2xl text-gray-700 mb-4 font-medium">
                        You've reached 50 clicks, but my love for you is infinite and beyond any number!
                      </p>
                      <p className="text-xl text-gray-600">
                        No amount of clicks can measure how precious you are to me, Mom!
                      </p>
                    </div>
                    <p className="text-lg text-gray-600 mb-8">- Your devoted Vasu 💖</p>

                    <div className="flex justify-center space-x-6">
                      <Button
                        onClick={resetLoveGame}
                        className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Count Again 💖
                      </Button>
                      <Button
                        onClick={() => setCurrentGame(null)}
                        variant="outline"
                        className="border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg"
                      >
                        Back to Games
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Birthday Wishes Section */}
        {currentSection === 3 && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-16">
                <Crown className="w-20 h-20 text-yellow-500 mx-auto mb-8 animate-pulse" />
                <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                  My Birthday Wishes for You
                </h2>
                <p className="text-xl text-gray-600">From the depths of my heart, with all my love...</p>
              </div>

              <Card className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-sm shadow-2xl border-2 border-pink-200 rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">My Dearest Mom,</h3>
                      <div className="text-lg text-gray-700 leading-relaxed space-y-6 text-left">
                        <p>
                          On your special day, I want you to know that you are not just my mother, but my greatest
                          blessing, my guiding star, and my source of endless inspiration. Your love has shaped every
                          good thing about me.
                        </p>
                        <p>
                          I wish you a year filled with boundless joy, radiant health, beautiful surprises, and all the
                          happiness your beautiful heart can hold. May every sunrise bring you new reasons to smile and
                          feel cherished.
                        </p>
                        <p>
                          Thank you for being my safe haven, my biggest cheerleader, my wisest counselor, and my dearest
                          friend. Your unconditional love is the greatest gift I've ever received.
                        </p>
                        <p>
                          You deserve to be celebrated not just today, but every single day. I love you more than all
                          the stars in the sky, deeper than the ocean, and beyond what words could ever express.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
                        Happy Birthday, My Beautiful Queen! 🎂👑
                      </div>
                      <div className="text-xl text-gray-700 font-semibold">
                        With infinite love and endless gratitude,
                      </div>
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mt-4">
                        Your loving son, Vasu 💕
                      </div>
                      <div className="text-sm text-gray-500 mt-2 italic">(Sanidhya Shishodia)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center space-x-8 mt-12 text-pink-500">
                <Heart className="w-16 h-16 animate-pulse" />
                <Cake className="w-16 h-16 animate-bounce" />
                <Gift className="w-16 h-16 animate-pulse delay-100" />
                <Sparkles className="w-16 h-16 animate-bounce delay-200" />
                <Crown className="w-16 h-16 animate-pulse delay-300" />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
