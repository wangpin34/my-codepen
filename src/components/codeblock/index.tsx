import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { sass } from "@codemirror/lang-sass";
import { EditorState, StateEffect } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import "./codeblock.css";

const languages = {
  html: html(),
  css: css(),
  sass: sass({ indented: true }),
  scss: sass(),
  javascript: javascript(),
};

type Language = keyof typeof languages;

interface Props {
  initialValue?: string;
  onChange: (value: string) => void;
  language: Language;
}

function useCodemirror(props: {
  node: Element | DocumentFragment;
  initialDoc?: string;
  language: Language;
  onChange: (state: EditorState) => void;
}) {
  const [editorView, setEditorView] = createSignal<EditorView>();
  const lgPkg = () => languages[props.language];
  const [state] = createSignal(
    EditorState.create({
      doc: props.initialDoc || "",
      extensions: [
        basicSetup,
        lgPkg(),
        oneDark,
        EditorView.updateListener.of((update: any) => {
          if (update.changes) {
            props.onChange && props.onChange(update.state);
          }
        }),
      ],
    })
  );

  createEffect(() => {
    console.log(`update state`, props.language);
    state().update({
      effects: [StateEffect.reconfigure.of(lgPkg())],
    });
       console.log(props.language, state());
    editorView()?.setState(state());
  });

  createEffect(() => {
    if (!props.node) return;
    if (editorView()) return;
    const view = new EditorView({
      state: state(),
      parent: props.node,
    });
    setEditorView(view);
  });

  createEffect(() => {
    console.log(`[useCodemirror] update state`, props.language);
  });

  return [editorView()];
}

export function CodeblockHasError(props: Props) {
  let node = <div class={`codeeditor h-full box`}></div>;
  const handleChange = (state: EditorState) =>
    props.onChange(state.doc.toString());
  const option = createMemo(() => ({
    //@ts-ignore
    node,
    initialDoc: props.initialValue,
    language: props.language,
    onChange: handleChange,
  }));
  //@ts-ignore
  const [editView] = useCodemirror(option());
  createEffect(() => {
    console.log(`[Codeblock] update state`, option().language);
  });
  return <>{node}</>;
}

export default function Codeblock(props: Props) {
  let node = <div class={`codeeditor h-full box`}></div>;
  const handleChange = (state: EditorState) =>
    props.onChange(state.doc.toString());

  const [editorView, setEditorView] = createSignal<EditorView>();
  const lgPkg = () => languages[props.language];
  const [state] = createSignal(
    EditorState.create({
      doc: props.initialValue || "",
      extensions: [
        basicSetup,
        lgPkg(),
        oneDark,
        EditorView.updateListener.of((update: any) => {
          if (update.changes) {
            handleChange(update.state);
          }
        }),
      ],
    })
  );

  createEffect(() => {
    console.log(`update state`, props.language);
    if (editorView()) {
      const extensions = [
        basicSetup,
        lgPkg(),
        oneDark,
        EditorView.updateListener.of((update: any) => {
          if (update.changes) {
            handleChange(update.state);
          }
        }),
      ];
      const tr = StateEffect.reconfigure.of(extensions);
      editorView()?.dispatch({ effects: tr });
    }
  });

  createEffect(() => {
    if (!node) return;
    if (editorView()) return;
    const view = new EditorView({
      state: state(),
      parent: node as Element,
    });
    setEditorView(view);
  });

  onCleanup(() => {
     editorView()?.destroy();
  });

  return <>{node}</>;
}
