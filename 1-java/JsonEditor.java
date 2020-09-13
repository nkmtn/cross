import java.io.*;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JMenuBar;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.KeyStroke;
import javax.swing.JFileChooser;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonValue;
import javax.json.stream.JsonParsingException;

public class JsonEditor {

    final JFrame frame = new JFrame("JSON Editor");
    final JTextPane pane = new JTextPane();
    final JFileChooser fc = new JFileChooser();

    public static void main(String args[]) {
        new JsonEditor().createFrame().addMenu().addTextPane().show();
    }

    private JsonEditor createFrame() {

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 600);

        return this;
    }

    private JsonEditor addMenu() {

        final JMenuItem openMenuItem = new JMenuItem("Open...");
        openMenuItem.addActionListener(event -> this.open());
        openMenuItem.setAccelerator(
            KeyStroke.getKeyStroke(KeyEvent.VK_O, KeyEvent.CTRL_DOWN_MASK)
        );

        final JMenuItem saveMenuItem = new JMenuItem("Save...");
        saveMenuItem.addActionListener(event -> this.save());
        saveMenuItem.setAccelerator(
            KeyStroke.getKeyStroke(KeyEvent.VK_S, KeyEvent.CTRL_DOWN_MASK)
        );

        final JMenuItem quitMenuItem = new JMenuItem("Quit");
        quitMenuItem.addActionListener(event -> System.exit(0));
        quitMenuItem.setAccelerator(
            KeyStroke.getKeyStroke(KeyEvent.VK_Q, KeyEvent.CTRL_DOWN_MASK)
        );

        final JMenu menu =new JMenu("File");
        menu.add(openMenuItem);
        menu.add(saveMenuItem);
        menu.addSeparator();
        menu.add(quitMenuItem);

        final JMenuBar menubar = new JMenuBar();
        menubar.add(menu);

        frame.setJMenuBar(menubar);

        return this;
    }

    private JsonEditor addTextPane() {

        pane.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
        pane.setText("Hello, world");

        final JScrollPane scrollPane = new JScrollPane(pane);

        final Container cp = frame.getContentPane();
        cp.add(scrollPane, BorderLayout.CENTER);

        return this;
    }

    private JsonEditor show() {

        frame.setVisible(true);

        return this;
    }

    private void open() {

        int returnVal = fc.showOpenDialog(frame);

        if (returnVal != JFileChooser.APPROVE_OPTION) {
            return;
        }

        File file = fc.getSelectedFile();

        try {
            FileReader reader = new FileReader(file.getAbsolutePath());
            pane.read(reader, file.getAbsolutePath());
        } catch (IOException ioe) {
            JOptionPane.showMessageDialog(
                new JFrame(),
                "Can't read JSON data from file",
                "I/O Error",
                JOptionPane.ERROR_MESSAGE
            );
        }
    }

    private void save() {

        if (!this.isValid(pane.getText())) {
            JOptionPane.showMessageDialog(
                new JFrame(),
                "Broken JSON",
                "Parse Error",
                JOptionPane.ERROR_MESSAGE
            );

            return;
        }

        int returnVal = fc.showSaveDialog(frame);

        if (returnVal != JFileChooser.APPROVE_OPTION) {
            return;
        }

        File file = fc.getSelectedFile();

        try {
            FileWriter writer = new FileWriter(file.getAbsolutePath());
            pane.write(writer);
        } catch (IOException ioe) {
            JOptionPane.showMessageDialog(
                new JFrame(),
                "Can't write JSON data to file",
                "I/O Error",
                JOptionPane.ERROR_MESSAGE
            );
        }
    }

    private boolean isValid(String text) {

        try {
            JsonReader reader = Json.createReader(new StringReader(text));
            JsonObject jsonObject = reader.readObject();
            reader.close();
        } catch (JsonParsingException jpe) {
            return false;
        }

        return true;
    }
}
