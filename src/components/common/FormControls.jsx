export function YesNoSelect({ value, onChange, ariaLabel }) {
  return (
    <select value={value ?? ''} onChange={(event) => onChange(event.target.value)} aria-label={ariaLabel}>
      <option value="">—</option>
      <option value="S">Sim</option>
      <option value="N">Não</option>
    </select>
  );
}

export function ScoreSelect({ value, onChange, ariaLabel }) {
  return (
    <select value={value ?? ''} onChange={(event) => onChange(event.target.value)} aria-label={ariaLabel}>
      <option value="">—</option>
      {[1, 2, 3, 4, 5].map((score) => (
        <option key={score} value={score}>{score}</option>
      ))}
    </select>
  );
}

export function DecisionSelect({ value, onChange, ariaLabel }) {
  return (
    <select value={value ?? ''} onChange={(event) => onChange(event.target.value)} aria-label={ariaLabel}>
      <option value="">—</option>
      <option value="A">Aceitou</option>
      <option value="I">Ignorou</option>
      <option value="D">Denunciou</option>
    </select>
  );
}

export function TextCellInput({ value, onChange, placeholder = '', ariaLabel }) {
  return (
    <input
      className="obs-input"
      type="text"
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}

export function SprintCell({ rows, index }) {
  const showLabel = index === 0 || rows[index].sprint !== rows[index - 1].sprint;
  return <td className="sprint-label">{showLabel ? `Sprint ${rows[index].sprint}` : ''}</td>;
}

export function TableScroll({ children }) {
  return <div className="table-scroll">{children}</div>;
}
