"use client";

import { Participants } from "@/app/board/[boardId]/_components/participants";
import { InfoBoard } from "./info-board";
import styles from "./infoBoard.module.scss";
import { useState } from "react";
import { useSelf } from "@/liveblocks.config";
import { useRenameModal } from "@/app/store/use-rename-modal";
import { EdgeTypePanel } from "../panels/edge-type-panel";
import { useGenerate } from "@/app/store/use-boardInfo";

const InfoBoardComponent = ({ boardId }: any) => {
  // const [description, setDescription] = useState("Тестовая доска для показа");
  const {description, setDescription} = useGenerate()
  const currentUser = useSelf();
  const { setIsVisisbleBoard } = useRenameModal();

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };
  return (
    <div className={styles.board}>
      <div className={styles.content}>
        <div className={styles.content__items}>
          <InfoBoard boardId={boardId} />
          <div>
            <h1>
              <strong>Owner:</strong> {currentUser.info?.name}
            </h1>
            <h1>
              <strong>Participants:</strong>
            </h1>
            <Participants />
          </div>
          <div className={styles.description}>
            <h1>
              <strong>Description:</strong>
            </h1>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className={styles.description}
            />
            <button className={styles.saveButton}>Save</button>
          </div>
          <div>
            <h1>
              <strong>Connection type:</strong>
            </h1>
            <EdgeTypePanel />
          </div>

          <div className={styles.date_info}>
            <h2>
              <strong>Created: </strong>27.10.2024{" "}
            </h2>
            <h2>
              <strong>Updated: </strong>27.10.2024{" "}
            </h2>
          </div>
        </div>
        <button className={styles.closeButton} onClick={setIsVisisbleBoard}>
          &#x2716;
        </button>
      </div>
    </div>
  );
};

export default InfoBoardComponent;
