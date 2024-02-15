import { fireEvent, render, screen } from "@testing-library/react";
import PopUp from "./Components/PopUp/PopUp";
import { useState } from "react";



describe("Render Pop", () => {
    it("should render PopUp component correctly when trigger = true", () => {
      render(<PopUp trigger={true}/>);
      const element = screen.getByTestId('popupext');
      expect(element).toBeInTheDocument();
    });
  });

  describe("Render Pop", () => {
    it("shouldn't render PopUp component when trigger = false", () => {
      render(<PopUp />);
      const element = screen.queryByTestId('popupext');
      expect(element).toBeNull();
    });
  });


 