import useCalculator from "../hooks/useCalculator";

const View = () => {
  const { count } = useCalculator();
  const className = count === 0 ? "red" : "";

  return <input type="text" disabled value={count} className={className} />;
};

export default function Calculator() {
  const { count, addCount, reset } = useCalculator();

  const inc = (value = 1) => addCount(value);

  const limpar = () => reset();

  return (
    <div className="Calculator">
      <header className="App-header">
        <h1>Carregou</h1>
      </header>
      <section>
        <div className="row cols-2">
          <div className="column">
            <p>{count}</p>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, i) => (
              <button onClick={() => inc(index)} key={i}>
                {index}
              </button>
            ))}
            <button onClick={limpar}>Limpar</button>
          </div>
          <div className="column">
            <View />
          </div>
        </div>
      </section>
    </div>
  );
}
