import { describe, test, expect } from "vitest";
import jsonModel from "./__fixtures__/model.json";
import { isSelectedCustomTypeTouched } from "@src/modules/selectedCustomType";
import { CustomType } from "@prismicio/types-internal/lib/customtypes/CustomType";
import { CustomTypes } from "@lib/models/common/CustomType";

const model = CustomTypes.toSM(jsonModel as unknown as CustomType);

describe("[Selected Custom type selectors]", () => {
  describe("[isSelectedCustomTypeTouched]", () => {
    test("it computes correctly the state of the modifications 1/4", () => {
      const customTypeStatus = isSelectedCustomTypeTouched({
        selectedCustomType: {
          model,
          initialModel: null,
        },
      });

      expect(customTypeStatus).toBe(true);
    });
    test("it computes correctly the state of the modifications 2/4", () => {
      const customTypeStatus = isSelectedCustomTypeTouched({
        selectedCustomType: {
          model,
          initialModel: model,
        },
      });

      expect(customTypeStatus).toBe(false);
    });
    test("it computes correctly the state of the modifications 3/4", () => {
      const customTypeStatus = isSelectedCustomTypeTouched({
        selectedCustomType: {
          model,
          initialModel: { ...model, label: `differ-from-${model.label}` },
        },
      });
      expect(customTypeStatus).toBe(true);
    });
    test("it computes correctly the state of the modifications 4/4", () => {
      const customTypeStatus = isSelectedCustomTypeTouched({
        selectedCustomType: {
          model,
          initialModel: { ...model, tabs: {} },
        },
      });
      expect(customTypeStatus).toBe(true);
    });
  });
});
