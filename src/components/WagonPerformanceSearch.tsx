import React, { useState } from "react";

// 画像import
import BoxWagon from "../assets/images/BoxWagon.png";
import CrafterWagon from "../assets/images/CrafterWagon.png";

type Wagon = {
  id: number;
  name: string;
  maxLevel: number;
  image: string;
};
type Part = {
  id: number;
  name: string;
};

const wagons: Wagon[] = [
  { id: 1, name: "ワゴンA", maxLevel: 3, image: BoxWagon },
  { id: 2, name: "ワゴンB", maxLevel: 5, image: CrafterWagon },
];

const parts: Part[] = [
  { id: 1, name: "拡張パーツX" },
  { id: 2, name: "拡張パーツY" },
];

export default function WagonPerformanceSearch() {
  const [selectedWagons, setSelectedWagons] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [selectedParts, setSelectedParts] = useState<{ [key: number]: string }>(
    {}
  );

  const handleWagonCheck = (wagonId: number) => {
    setSelectedWagons((prev) =>
      prev.includes(wagonId)
        ? prev.filter((id) => id !== wagonId)
        : [...prev, wagonId]
    );
  };

  const handlePartChange = (wagonId: number, partId: string) => {
    setSelectedParts((prev) => ({
      ...prev,
      [wagonId]: partId,
    }));
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  return (
    <div>
      <h2>性能検索モード</h2>
      <div>
        <h3>ワゴン選択</h3>
        {wagons.map((wagon) => (
          <label key={wagon.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectedWagons.includes(wagon.id)}
              onChange={() => handleWagonCheck(wagon.id)}
            />
            <img
              src={wagon.image}
              alt={wagon.name}
              width={32}
              height={32}
              style={{ imageRendering: "pixelated", verticalAlign: "middle" }}
            />
            {wagon.name}
          </label>
        ))}
      </div>
      <div>
        <h3>比較レベル選択</h3>
        <input
          type="number"
          min={1}
          max={Math.max(...wagons.map((w) => w.maxLevel))}
          value={level}
          onChange={handleLevelChange}
        />
      </div>
      <div>
        <h3>選択中ワゴンの性能比較</h3>
        <table border={1}>
          <thead>
            <tr>
              <th>ワゴン名</th>
              <th>画像</th>
              <th>レベル</th>
              <th>拡張パーツ</th>
              <th>性能詳細</th>
            </tr>
          </thead>
          <tbody>
            {selectedWagons.map((wagonId) => {
              const wagon = wagons.find((w) => w.id === wagonId);
              if (!wagon) return null;
              return (
                <tr key={wagonId}>
                  <td>{wagon.name}</td>
                  <td>
                    <img
                      src={wagon.image}
                      alt={wagon.name}
                      width={32}
                      height={32}
                      style={{ imageRendering: "pixelated" }}
                    />
                  </td>
                  <td>
                    {level} / {wagon.maxLevel}
                  </td>
                  <td>
                    <select
                      value={selectedParts[wagonId] || ""}
                      onChange={(e) =>
                        handlePartChange(wagonId, e.target.value)
                      }
                    >
                      <option value="">なし</option>
                      {parts.map((part) => (
                        <option key={part.id} value={part.id}>
                          {part.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {/* ここに性能詳細を表示（後でデータとロジックを追加） */}
                    性能データ
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}