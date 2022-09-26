import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../components/Header';
import MiniCard from '../components/MiniCard';
import {NUM_OF_COLUMNS, TOTAL_PAIR_CARDS} from '../constants';

function shuffleArray(array) {
  //  Fisher-Yates shuffle algorithm for shuffling an array of cards
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const CardScreen = () => {
  const dispatch = useDispatch();
  const [cardsNumber, setCardsNumber] = useState([]);
  const [steps, setSteps] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [cardsChosen, setCardsChosen] = useState(0);

  const generateShuffleNumber = () => {
    let numArray = [];
    while (numArray.length < 6) {
      var randNum = Math.floor(Math.random() * 100) + 1;
      if (numArray.filter(e => e.number === randNum).length === 0) {
        numArray.push({number: randNum, isMatch: false});
      }
    }

    // shuffle array
    var shuffleNumArray = shuffleArray([...numArray, ...numArray]);
    // insert index
    shuffleNumArray = shuffleNumArray.map((item, currentIndex) => {
      return {...item, index: currentIndex};
    });
    resetChoice();
    setCardsNumber(shuffleNumArray);
    setSteps(0);
    setCardsChosen(0);
    //console.log('New Array: ' + JSON.stringify(shuffleNumArray));
  };

  const renderListItem = ({item, index}) => {
    return (
      <MiniCard
        cardLabel={item.number}
        onHandleClick={() => handleCardChoice(index)}
        isFlipped={
          index === choiceOne?.index ||
          index === choiceTwo?.index ||
          item.isMatch
        }
      />
    );
  };

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleCardChoice = index => {
    var item = cardsNumber[index];
    var sameCardSelected = index === choiceOne?.index;

    // Click on cards not allowed if cards are already paired
    // Click on cards not allowed if cards are matching the value
    if (
      !item.isMatch &&
      !sameCardSelected &&
      (choiceOne === null || choiceTwo === null)
    ) {
      choiceOne !== null ? setChoiceTwo(item) : setChoiceOne(item);
      setSteps(prev => prev + 1);
    }
  };

  const checkGameCompletion = () => {
    if (cardsChosen === TOTAL_PAIR_CARDS) {
      Alert.alert('Congratulations!', `You win the game by ${steps} steps!`, [
        {text: 'Try another round', onPress: generateShuffleNumber},
      ]);
    }
  };

  // this useEffect is used to match card choice
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.number === choiceTwo.number) {
        setCardsNumber(prevCards => {
          return prevCards.map(card => {
            if (card.number === choiceOne.number) {
              return {...card, isMatch: true};
            } else {
              return card;
            }
          });
        });
        setCardsChosen(count => count + 1);
        resetChoice();
      } else {
        setTimeout(() => resetChoice(), 1000);
      }
      //resetChoice();
    }
  }, [choiceOne, choiceTwo]);

  // this useEffect is to Start Game
  useEffect(() => {
    generateShuffleNumber();
  }, []);

  // this useEffect is to check game completion
  useEffect(() => {
    checkGameCompletion();
  }, [cardsChosen]);

  return (
    <SafeAreaView style={styles.cardContainer}>
      <Header onClickRestart={generateShuffleNumber} stepCount={steps} />
      <FlatList
        data={cardsNumber}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={NUM_OF_COLUMNS}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
  },
});

export default CardScreen;
